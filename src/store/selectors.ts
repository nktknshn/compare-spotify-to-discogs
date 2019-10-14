import { createSelector } from "reselect";
import { AppState } from "Store";
import { isSome, map, getOrElse, chain, option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
// import { SearchResponseEntity, SearchResponse } from "discogs/_types";
import { sequenceT } from "fp-ts/lib/Apply";
import { SearchResult } from "typescript-discogs-client";

const tupleO = sequenceT(option)

const getCurrentTrack = (state: AppState) => state.app.currentTrack;
// const getDiscogsArtist = (state: AppState) => state.app.discogsArtist;

// type Sel<T extends any> = (state: AppState) => T
// const getIsLoading = (state: AppState) => state.app.isLoading

export const getSpotifyArtists = (state: AppState) => state.app.spotifyArtists
export const getSpotifySelectedIdx = (state: AppState) => state.app.selectedSpotifyIdx

export const getDiscogsSearchResults = (state: AppState) => state.app.discogsSearchResults
export const getDiscogsSelectedIdx = (state: AppState) => state.app.selectedDiscogsIdx

export const getSelectedDiscogsSearchResult =
  createSelector(
    getDiscogsSearchResults,
    getDiscogsSelectedIdx,
    (results, idx) =>
      pipe(
        tupleO(results, idx),
        map(([results, idx]) => results[idx])
      )
  )

export const getSelectedSpotifyArtist =
  createSelector(getSpotifyArtists, getSpotifySelectedIdx,
    (artists, idx) => pipe(idx, map(idx => artists[idx])))

export const isLoadingComplete = (state: AppState) =>
  state.app.spotifyArtists.length > 0

export const isAuthorized = (state: AppState) =>
  isSome(state.app.accessToken);

export const spotifyAlbumTracksShown = (id: string) => (state: AppState) =>
  state.app.spotifyTracks.indexOf(id) > -1;

export const isDiscogsSearchEmpty =
  (state: AppState) => pipe(state.app.discogsSearchResults,
    getOrElse((): SearchResult[] => [])).length == 0


const getDiscogsTracks = (state: AppState) => state.app.discogsTracks

export const isReleaseExpanded = (releaseId: number) => (state: AppState) =>
  releaseId in state.app.discogsTracks && state.app.discogsTracks[releaseId].length > 0
  // createSelector(
  //   getDiscogsTracks,
  //   tracks => releaseId in tracks && tracks[releaseId].length > 0
  // )

  // releaseId in state.app.discogsTracks && state.app.discogsTracks[releaseId].length > 0

// export const getLoadComplete = createSelector(
//     getCurrentTrack,
//     getDiscogsArtist
// )
