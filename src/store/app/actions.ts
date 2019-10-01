import { createActionCreator, createReducer, createAction } from 'deox'
import { fromNullable, Option } from 'fp-ts/lib/Option'
import { AppState } from './types'
import { TracklistEntity } from 'discogs/types'


export const setCurrentTrack = createActionCreator('SET_CURRENT_TRACK',
  resolve => (track: Option<SpotifyApi.TrackObjectFull>) => resolve(track))

export const setAccessToken = createActionCreator('SET_ACCESS_TOKEN',
  resolve => (accessToken: Option<string>) => resolve(accessToken))

export const setLoadingSpotify = createActionCreator('SET_LOADING_SPOTIFY',
  resolve => (loading: boolean) => resolve(loading))

export const setLoadingDiscogs = createActionCreator('SET_LOADING_DISCOGS',
  resolve => (loading: boolean) => resolve(loading))

export const setSpotifyArtists = createActionCreator('SET_SPOTIFY_ARTISTS',
  resolve => (artists: SpotifyApi.ArtistObjectSimplified[]) => resolve(artists))

export const setSpotifyAlbums = createActionCreator('SET_SPOTIFY_ALBUMS',
  resolve => (albums: SpotifyApi.AlbumObjectFull[]) => resolve(albums))

export const setSelectedSpotifyIdx = createActionCreator('SET_SELECTED_SPOTIFY_ARTIST_IDX',
  resolve => (idx: AppState['selectedSpotifyIdx']) => resolve(idx))

export const setDiscogsSearchResults = createActionCreator('SET_DISCOGS_SEARCH_RESULTS',
  resolve => (res: AppState['discogsSearchResults']) => resolve(res))

export const setSelectedDiscogsIdx = createActionCreator('SET_SELECTED_DISCOGS_IDX',
  resolve => (res: AppState['selectedDiscogsIdx']) => resolve(res))

// export const setDiscogsArtist = createActionCreator('SET_DISCOGS_ARTIST',
//   resolve => (res: AppState['discogsArtist']) => resolve(res))

export const toggleShowSingles = createAction('TOGGLE_SINGLES')
export const toggleShowCompilations = createAction('TOGGLE_COMPILATIONS')
export const toggleShowTrackAppearances = createAction('TOGGLE_TRACK_APPEARANCES')

export const setDiscogsReleases = createActionCreator('SET_DISCOGS_RELEASES',
  resolve => (res: AppState['discogsReleases']) => resolve(res))

export const setShowOtherResults = createActionCreator('SET_SHOW_OTHER_RESULTS',
  resolve => (res: AppState['showOtherResults']) => resolve(res))

export const addDiscogsReleaseTracks = createActionCreator('ADD_DISCOGS_TRACKS',
  resolve => (releaseId: number, tracks: TracklistEntity[]) => resolve({ releaseId, tracks }))

export const resetDiscogsReleaseTracks = createAction('RESET_DISCOGS_TRACKS')
export const resetTracks = createAction('RESET_DISCOGS_TRACKS')

export const removeDiscogsReleaseTracks = createActionCreator('REMOVE_DISCOGS_TRACKS',
  resolve => (releaseId: number) => resolve(releaseId))

export const resetSpotifyAlbumTracks = createAction('RESET_SPOTIFY_TRACKS')

export const addSpotifyAlbumTracks = createActionCreator('ADD_SPOTIFY_TRACKS',
  resolve => (albumId: string) => resolve(albumId))

export const removeSpotifyAlbumTracks = createActionCreator('REMOVE_SPOTIFY_TRACKS',
  resolve => (albumId: string) => resolve(albumId))

export const setError = createActionCreator('SET_ERROR',
  resolve => (error: AppState['error']) => resolve(error))

export const setArtistId = createActionCreator('SET_ARTIST_ID',
  resolve => (artistId: AppState['artistId']) => resolve(artistId))

export const setSpotifyArtistFull = createActionCreator('SET_SPOTIFY_ARTIST_FULL',
  resolve => (artist: AppState['spotifyArtistFull']) => resolve(artist))