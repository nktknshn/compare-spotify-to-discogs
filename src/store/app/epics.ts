import { discogs } from "discogs";
import { MasterReleaseResponse, ReleaseResponse, ReleasesEntity } from "discogs/types";
import * as E from "fp-ts/lib/Either";
import { Either, fold as foldE, isRight, map as mapE } from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { fromNullable, isNone, isSome, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as TE from "fp-ts/lib/TaskEither";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { spotify } from "spotify";
import { ThunkAC } from "Store";
import {
  addDiscogsReleaseTracks, addSpotifyAlbumTracks, removeDiscogsReleaseTracks, removeSpotifyAlbumTracks, resetDiscogsReleaseTracks, resetSpotifyAlbumTracks, setAccessToken, setCurrentTrack,
  // setDiscogsArtist,
  setDiscogsReleases, setDiscogsSearchResults, setError, setLoadingDiscogs, setLoadingSpotify, setSelectedDiscogsIdx, setSelectedSpotifyIdx, setSpotifyAlbums, setSpotifyArtists, setSpotifyArtistFull
} from "./actions";
import { isDiscogsSearchEmpty } from "Store/selectors";
import { DISCOGS_RELEASES_TO_LOAD } from "app/modules/config";

type SpotifyError = { statusCode: number };

const toError = (reason: any) => reason as SpotifyError;



export const loadCurrentSpotifyArtistFull = (): ThunkAC<Promise<void>> => async (dispatch, getState) => {

  const { app: { selectedSpotifyIdx, spotifyArtists } } = getState()

  if (isNone(selectedSpotifyIdx) || spotifyArtists.length == 0)
    return

  dispatch(setLoadingSpotify(true));

  await pipe(
    tryCatch(() => spotify.getArtist(spotifyArtists[selectedSpotifyIdx.value].id), toError),
    TE.map(res => res.body),
    TE.fold(
      (err) => async () => { dispatch(setError(some(err))) },
      (artist) => async () => {
        dispatch(setSpotifyArtistFull(some(artist)))
      }
    )
  )()

  dispatch(setLoadingSpotify(false));
}

export const loadSpotifyArtistId = (artistId: string): ThunkAC<Promise<void>> => async (dispatch) => {
  dispatch(setLoadingSpotify(true));

  await pipe(
    tryCatch(() => spotify.getArtist(artistId), toError),
    TE.map(res => res.body),
    TE.fold(
      (err) => async () => { dispatch(setError(some(err))) },
      (artist) => async () => {
        dispatch(setSpotifyArtists([artist]))
        await dispatch(onLoad())
      }
    )
  )()
  dispatch(setLoadingSpotify(false));
}

export const resetTracks = (): ThunkAC<void> => (dispatch) => {
  dispatch(resetDiscogsReleaseTracks())
  dispatch(resetSpotifyAlbumTracks())
}

export const resetDiscogs = (): ThunkAC => (dispatch) => {
  dispatch(setSelectedDiscogsIdx(none));
  dispatch(resetDiscogsReleaseTracks())
  dispatch(setDiscogsSearchResults(none));
  dispatch(setDiscogsReleases([]));
}

export const resetSpotify = (): ThunkAC => (dispatch) => {


}

export const openDiscogsArtistIdx = (idx: number): ThunkAC<Promise<void>> => async (dispatch) => {
  dispatch(resetTracks())
  dispatch(setSelectedDiscogsIdx(some(idx)));
  await dispatch(loadDiscogsReleases());
}

export const openSpotifyArtistIdx = (idx: number): ThunkAC<Promise<void>> => async (dispatch, getState) => {
  dispatch(resetTracks())
  dispatch(resetDiscogs())

  dispatch(dispatch(setSpotifyArtistFull(none)));
  dispatch(setSelectedSpotifyIdx(some(idx)));
  await dispatch(openCurrentSpotifyArtist());

  await dispatch(searchDiscogsWithCurrentArtist());

  if (!isDiscogsSearchEmpty(getState())) {
    dispatch(setSelectedDiscogsIdx(some(0)));
    await dispatch(loadDiscogsReleases());
  }
}

export const toggleSpotifyReleaseTracks = (release: SpotifyApi.AlbumObjectFull): ThunkAC =>
  async (dispatch, getState) => {
    const { spotifyTracks } = getState().app;

    if (spotifyTracks.indexOf(release.id) > -1) {
      dispatch(removeSpotifyAlbumTracks(release.id));
    } else {
      dispatch(addSpotifyAlbumTracks(release.id));
    }
  };

export const toggleDiscogsReleaseTracks = (release: ReleasesEntity): ThunkAC<Promise<void>> =>
  async (dispatch, getState) => {
    const { discogsTracks } = getState().app;
    dispatch(setLoadingDiscogs(true))

    if (release.id in discogsTracks && discogsTracks[release.id].length > 0) {
      dispatch(removeDiscogsReleaseTracks(release.id));
    } else {

      const res: Either<any, ReleaseResponse | MasterReleaseResponse> = (release.type == 'release')
        ? await discogs.getRelease(release.id)
        : await discogs.getMasterRelease(release.id)

      pipe(
        res,
        E.map(res => fromNullable(res.tracklist)),
        E.fold(
          (err) => () => { dispatch(setError(some(err))) },
          (res) => () => { isSome(res) && dispatch(addDiscogsReleaseTracks(release.id, res.value)) }
        )
      )();

    }
    dispatch(setLoadingDiscogs(false))
  };


export const onLoad = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {

  await dispatch(loadCurrentTrack());

  const { currentTrack } = getState().app;

  if (isSome(currentTrack)) {
    dispatch(setSpotifyArtists(currentTrack.value.artists));
  }

  const { spotifyArtists } = getState().app;

  if (spotifyArtists.length > 0) {

    dispatch(setSelectedSpotifyIdx(some(0)));

    await dispatch(openCurrentSpotifyArtist());
    await dispatch(searchDiscogsWithCurrentArtist());
    dispatch(setSelectedDiscogsIdx(some(0)));
    await dispatch(loadDiscogsReleases());
  }

};


export const loadDiscogsReleases = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {
  const {
    selectedDiscogsIdx,
    discogsSearchResults,
  } = getState().app;

  if (isSome(selectedDiscogsIdx) && isSome(discogsSearchResults)) {
    dispatch(setLoadingDiscogs(true))

    pipe(
      await discogs.getArtistReleases(discogsSearchResults.value[selectedDiscogsIdx.value].id,
        { sort: "year", per_page: DISCOGS_RELEASES_TO_LOAD }),
      E.map(r => fromNullable(r.releases)),
      E.fold(
        err => () => { dispatch(getErrorAction(err)) },
        (res) => () => { dispatch(setDiscogsReleases(isSome(res) ? res.value : [])) }
      )
    )();

    dispatch(setLoadingDiscogs(false))
  }
};


export const searchDiscogsWithCurrentArtist = (): ThunkAC<
  Promise<void>
> => async (dispatch, getState) => {
  const { spotifyArtists, selectedSpotifyIdx } = getState().app;

  if (spotifyArtists.length > 0 && isSome(selectedSpotifyIdx)) {

    dispatch(setLoadingDiscogs(true))

    pipe(
      await discogs.search({
        query: spotifyArtists[selectedSpotifyIdx.value].name,
        type: "artist"
      }),
      E.fold(
        err => () => { dispatch(getErrorAction(err)) },
        (res) => () => { dispatch(setDiscogsSearchResults(some(res.results))) },
      ))()

    dispatch(setLoadingDiscogs(false))
  }
};


const getErrorAction = (error: any): ThunkAC<void> => (dispatch) => {
  error.statusCode == 401 ? dispatch(setAccessTokenEpic(none)) : dispatch(setError(some(error)))
}

export const loadCurrentTrack = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingSpotify(true));

  pipe(
    await tryCatch(() => spotify.getMyCurrentPlayingTrack(), toError)(),
    E.map(res => fromNullable(res.body)),
    E.map(O.chain(body => fromNullable(body.item))),
    E.fold(
      err => () => { dispatch(getErrorAction(err)) },
      track => () => { dispatch(setCurrentTrack(track)) }
    )
  )()

  dispatch(setLoadingSpotify(false));
};


export const setAccessTokenEpic = (
  accessToken: Option<string>
): ThunkAC => dispatch => {
  dispatch(setAccessToken(accessToken));


  spotify.setAccessToken(
    isSome(accessToken) ? accessToken.value : ""
  );
};


export const openCurrentSpotifyArtist = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {
  const { spotifyArtists, selectedSpotifyIdx } = getState().app;

  if (isNone(selectedSpotifyIdx))
    return

  dispatch(setLoadingSpotify(true));

  const { map, chain } = TE

  const albums = await pipe(
    tryCatch(() => spotify.getArtistAlbums(spotifyArtists[selectedSpotifyIdx.value].id), toError),
    map(res => res.body.items.map(_ => _.id)),
    chain(ids => tryCatch(() => spotify.getAlbums(ids), toError)),
    map(res => res.body.albums),
  )();

  if (isRight(albums))
    dispatch(setSpotifyAlbums(albums.right))
  else
    dispatch(getErrorAction(albums.left))


  dispatch(setLoadingSpotify(false));

  await dispatch(loadCurrentSpotifyArtistFull())

};
