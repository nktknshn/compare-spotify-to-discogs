import { createSelector } from "reselect";
import { AppState } from "Store";
import { isSome, map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { SearchResponseEntity } from "discogs/types";

const getCurrentTrack = (state: AppState) => state.app.currentTrack;
// const getDiscogsArtist = (state: AppState) => state.app.discogsArtist;

// type Sel<T extends any> = (state: AppState) => T
// const getIsLoading = (state: AppState) => state.app.isLoading

export const isLoadingComplete = (state: AppState) =>
  state.app.spotifyArtists.length > 0

export const isAuthorized = (state: AppState) =>
  isSome(state.app.accessToken);

export const spotifyAlbumTracksShown = (id: string) => (state: AppState) =>
  state.app.spotifyTracks.indexOf(id) > -1;

export const isDiscogsSearchEmpty =
  (state: AppState) => pipe(state.app.discogsSearchResults,
    getOrElse((): SearchResponseEntity[] => [])).length == 0

// export const getLoadComplete = createSelector(
//     getCurrentTrack,
//     getDiscogsArtist
// )
