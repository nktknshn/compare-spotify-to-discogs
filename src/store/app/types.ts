import { Option } from "fp-ts/lib/Option";

import * as Discogs from 'typescript-discogs-client'
import { Master, Release, MasterTrack, ReleaseTrack } from "typescript-discogs-client";


export type Track = MasterTrack | ReleaseTrack

export interface DiscogsTracks { [releaseId: number]: Track[] }

export interface AppState {
  accessToken: Option<string>;

  artistId: Option<string>

  currentTrack: Option<SpotifyApi.TrackObjectFull>;
  
  spotifyArtists: SpotifyApi.ArtistObjectSimplified[];
  spotifyArtistFull: Option<SpotifyApi.ArtistObjectFull>;
  spotifyAlbums: SpotifyApi.AlbumObjectFull[];
  selectedSpotifyIdx: Option<number>;
  spotifyTracks: string[];

  discogsSearchResults: Option<Discogs.SearchResult[]>;
  discogsReleases: (Discogs.ArtistRelease | Discogs.ArtistMaster)[];
  selectedDiscogsIdx: Option<number>;
  discogsTracks: DiscogsTracks;

  isLoadingSpotify: boolean;
  isLoadingDiscogs: boolean;

  showTrackAppearances: boolean;
  showSingles: boolean;
  showCompilations: boolean;
  showMainReleases: boolean;
  
  showOtherResults: boolean;
  showSearchInput: boolean;
  
  discogsGenres: string[],
  
  error: Option<any>;
}
