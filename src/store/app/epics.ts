import { isSome, none, some } from "fp-ts/lib/Option";
import { ThunkAC } from "Store";
import { isDiscogsSearchEmpty } from "Store/selectors";
import {
  resetDiscogsReleaseTracks, resetSpotifyAlbumTracks,
  setDiscogsReleases, setDiscogsSearchResults, setSelectedDiscogsIdx,
  setSelectedSpotifyIdx, setSpotifyAlbums, setSpotifyArtistFull, setSpotifyArtists
} from "./actions";
import { loadDiscogsReleases, loadSearchDiscogsWithCurrentArtist, loadDiscogsGenres } from "./epics-discogs";
import { loadCurrentSpotifyAlbums, loadCurrentSpotifyArtistFullObject, loadCurrentTrack, loadSearchInputSpotifyArtistId } from "./epics-spotify";

// const asyncError =
//   <T extends ThunkDispatch<AppState, undefined, AllActions>>(d: T) =>
//     (err: any) => async () => { d(getErrorAction(err)) }


export const onMainPageLoad = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {

  const currentTrack = await dispatch(loadCurrentTrack());

  if (isSome(currentTrack)) {
    dispatch(setSpotifyArtists(currentTrack.value.artists));
    dispatch(openSpotifyArtistIdx(0))
  }

};

export const searchSpotify = (artistId: string): ThunkAC<Promise<void>> => async (dispatch) => {
  dispatch(resetSpotify())
  if (await dispatch(loadSearchInputSpotifyArtistId(artistId)))
    dispatch(openSpotifyArtistIdx(0))
}

export const resetExpandedTracks = (): ThunkAC<void> => (dispatch) => {
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
  dispatch(setSpotifyArtistFull(none));
  dispatch(setSelectedSpotifyIdx(none));
  dispatch(setSpotifyArtists([]))
  dispatch(setSpotifyAlbums([]))
}

export const openDiscogsArtistIdx = (idx: number): ThunkAC<Promise<void>> => async (dispatch) => {
  dispatch(resetExpandedTracks())
  dispatch(setSelectedDiscogsIdx(some(idx)));
  await dispatch(loadDiscogsReleases());
  await dispatch(loadDiscogsGenres())
}

export const openSpotifyArtistIdx = (idx: number): ThunkAC<Promise<void>> => async (dispatch, getState) => {
  dispatch(resetExpandedTracks())
  dispatch(resetDiscogs())

  dispatch(setSpotifyArtistFull(none));
  dispatch(setSelectedSpotifyIdx(some(idx)));
  await dispatch(loadCurrentSpotifyArtist());

  await dispatch(loadSearchDiscogsWithCurrentArtist());

  if (!isDiscogsSearchEmpty(getState())) {
    await dispatch(openDiscogsArtistIdx(0))
  }
}

export const loadCurrentSpotifyArtist = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {

  await dispatch(loadCurrentSpotifyAlbums())
  await dispatch(loadCurrentSpotifyArtistFullObject())

};
