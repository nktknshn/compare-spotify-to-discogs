import * as E from "fp-ts/lib/Either";
import { isRight } from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { fromNullable, isNone, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as TE from "fp-ts/lib/TaskEither";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { spotify } from "spotify";
import { ThunkAC } from "Store";
import { addSpotifyAlbumTracks, removeSpotifyAlbumTracks, setCurrentTrack, setLoadingSpotify, setSpotifyAlbums, setSpotifyArtistFull, setSpotifyArtists, setError } from "./actions";
import { setAccessTokenEpic } from "./epics-token";

const toSpotifyError = (error: any) => error as SpotifyError;

type SpotifyError = { statusCode: number, message: string };

const getErrorAction = (error: SpotifyError): ThunkAC<void> => (dispatch) => {
  return error.statusCode == 401
    ? dispatch(setAccessTokenEpic(none))
    : dispatch(setError(some({
      name: "Spotify error",
      message: error.message,
      code: error.statusCode
    })))
}


export const loadCurrentSpotifyAlbums = (): ThunkAC<Promise<void>> => async (dispatch, getState) => {

  const { spotifyArtists, selectedSpotifyIdx } = getState().app;

  if (isNone(selectedSpotifyIdx) || !spotifyArtists.length)
    return

  dispatch(setLoadingSpotify(true));

  const { map, chain } = TE

  const albums = await pipe(
    tryCatch(() => spotify.getArtistAlbums(spotifyArtists[selectedSpotifyIdx.value].id), toSpotifyError),
    map(res => res.body.items.map(_ => _.id)),
    chain(ids => tryCatch(() => spotify.getAlbums(ids), toSpotifyError)),
    map(res => res.body.albums),
  )();

  if (isRight(albums))
    dispatch(setSpotifyAlbums(albums.right))
  else
    dispatch(getErrorAction(albums.left))


  dispatch(setLoadingSpotify(false));

}

export const loadCurrentTrack = (): ThunkAC<Promise<Option<SpotifyApi.TrackObjectFull>>> => async (
  dispatch,
) => {
  dispatch(setLoadingSpotify(true));

  const { map, fold } = E
  const { chain } = O

  const trackLoaded = pipe(
    await tryCatch(() => spotify.getMyCurrentPlayingTrack(), toSpotifyError)(),
    map(res => fromNullable(res.body)),
    map(chain(body => fromNullable(body.item))),
    fold(
      err => () => { dispatch(getErrorAction(err)); return none },
      track => () => { dispatch(setCurrentTrack(track)); return track }
    )
  )()

  dispatch(setLoadingSpotify(false));

  return trackLoaded
};

export const toggleSpotifyReleaseTracks = (release: SpotifyApi.AlbumObjectFull): ThunkAC =>
  async (dispatch, getState) => {
    const { spotifyTracks } = getState().app;

    if (spotifyTracks.indexOf(release.id) > -1) {
      dispatch(removeSpotifyAlbumTracks(release.id));
    } else {
      dispatch(addSpotifyAlbumTracks(release.id));
    }
  };

export const loadCurrentSpotifyArtistFullObject = (): ThunkAC<Promise<void>> => async (dispatch, getState) => {

  const { app: { selectedSpotifyIdx, spotifyArtists } } = getState()
  const { map, fold } = TE

  if (isNone(selectedSpotifyIdx) || spotifyArtists.length == 0)
    return

  dispatch(setLoadingSpotify(true));

  await pipe(
    tryCatch(() =>
      spotify.getArtist(spotifyArtists[selectedSpotifyIdx.value].id), toSpotifyError),
    map(res => res.body),
    fold(
      (err) => async () => { dispatch(getErrorAction(err)) },
      (artist) => async () => { dispatch(setSpotifyArtistFull(some(artist))) }
    )
  )()

  dispatch(setLoadingSpotify(false));
}

export const loadSearchInputSpotifyArtistId = (artistId: string): ThunkAC<Promise<boolean>> => async (dispatch) => {

  const { map, fold } = TE

  dispatch(setLoadingSpotify(true));

  const success = await pipe(
    tryCatch(() =>
      spotify.getArtist(artistId), toSpotifyError),
    map(res => res.body),
    fold(
      (err) => async () => {
        if (err.statusCode === 400) {
          dispatch(setError(some({
            code: 400,
            message: `Artist with id '${artistId}' was not found`,
            name: "Spotify error"
          })))
        } else {
          dispatch(getErrorAction(err))
        }
        return false
      },
      (artist) => async () => {
        dispatch(setSpotifyArtists([artist]));
        return true
      }
    )
  )()

  dispatch(setLoadingSpotify(false));

  return success
}