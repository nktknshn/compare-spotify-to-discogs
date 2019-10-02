import { createReducer } from 'deox';
import { none, some } from 'fp-ts/lib/Option';
import * as actions from './actions';
import { AppState, DiscogsTracks } from './types';
import { ActionType } from 'typesafe-actions'

export type AppActions = ActionType<typeof actions>

const defaultState: AppState = {
  accessToken: none,
  currentTrack: none,
  artistId: none,

  spotifyArtists: [],
  spotifyArtistFull: none,
  spotifyAlbums: [],
  spotifyTracks: [],

  // discogsArtist: none,
  discogsSearchResults: none,
  discogsReleases: [],
  discogsTracks: {},

  selectedSpotifyIdx: none,
  selectedDiscogsIdx: none,

  // isLoading: true,
  isLoadingSpotify: true,
  isLoadingDiscogs: true,

  showTrackAppearances: false,
  showSingles: true,
  showCompilations: true,
  showOtherResults: false,

  showSearchInput: true,

  error: none
}


export const appReducer = createReducer(defaultState, handleAction => [
  handleAction(actions.setError, (state, { payload }) => ({ ...state, error: payload })),
  handleAction(actions.toggleShowSingles, (state) => ({ ...state, showSingles: !state.showSingles })),
  handleAction(actions.toggleShowCompilations, (state) => ({ ...state, showCompilations: !state.showCompilations })),

  handleAction(actions.toggleShowTrackAppearances, (state) => ({ ...state, showTrackAppearances: !state.showTrackAppearances })),

  handleAction(actions.setCurrentTrack, (state, { payload }) => ({ ...state, currentTrack: payload })),
  handleAction(actions.setArtistId, (state, { payload }) => ({ ...state, artistId: payload })),
  handleAction(actions.setAccessToken, (state, { payload }) => ({ ...state, accessToken: payload })),
  handleAction(actions.setLoadingSpotify, (state, { payload }) => ({ ...state, isLoadingSpotify: payload })),
  handleAction(actions.setLoadingDiscogs, (state, { payload }) => ({ ...state, isLoadingDiscogs: payload })),

  handleAction(actions.setSpotifyArtists, (state, { payload }) => ({ ...state, spotifyArtists: payload })),
  handleAction(actions.setSpotifyAlbums, (state, { payload }) => ({ ...state, spotifyAlbums: payload })),

  handleAction(actions.setSelectedSpotifyIdx, (state, { payload }) => ({ ...state, selectedSpotifyIdx: payload })),
  handleAction(actions.setSelectedDiscogsIdx, (state, { payload }) => ({ ...state, selectedDiscogsIdx: payload })),
  handleAction(actions.setDiscogsSearchResults, (state, { payload }) => ({ ...state, discogsSearchResults: payload })),
  handleAction(actions.setDiscogsReleases, (state, { payload }) => ({ ...state, discogsReleases: payload })),
  handleAction(actions.setShowOtherResults, (state, { payload }) => ({ ...state, showOtherResults: payload })),
  handleAction(actions.resetDiscogsReleaseTracks, (state) => ({ ...state, discogsTracks: {} as AppState['discogsTracks'] })),
  handleAction(actions.resetSpotifyAlbumTracks, (state) => ({ ...state, spotifyTracks: [] as AppState['spotifyTracks'] })),
  handleAction(actions.addDiscogsReleaseTracks, (state, { payload }) => ({
    ...state, discogsTracks: {
      ...state.discogsTracks,
      [payload.releaseId]: payload.tracks
    }
  })),
  handleAction(actions.removeDiscogsReleaseTracks, (state, { payload }) => ({
    ...state, discogsTracks: {
      ...state.discogsTracks,
      [payload]: []
    }
  })),
  handleAction(actions.removeSpotifyAlbumTracks, (state, { payload }) => ({
    ...state, spotifyTracks: [...state.spotifyTracks.filter(_ => _ != payload)]
  })),
  handleAction(actions.addSpotifyAlbumTracks, (state, { payload }) => ({
    ...state, spotifyTracks: [payload, ...state.spotifyTracks]
  })),

  handleAction(actions.setSpotifyArtistFull, (state, { payload }) => ({ ...state, spotifyArtistFull: payload }))
])