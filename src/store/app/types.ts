import { Option } from "fp-ts/lib/Option";
import {
  SearchResponseEntity,
  ReleasesEntity,
  TracklistEntity
} from "discogs/types";

export interface DiscogsTracks { [releaseId: number]: TracklistEntity[] }

export interface AppState {
  accessToken: Option<string>;

  artistId: Option<string>

  currentTrack: Option<SpotifyApi.TrackObjectFull>;
  
  spotifyArtists: SpotifyApi.ArtistObjectSimplified[];
  spotifyArtistFull: Option<SpotifyApi.ArtistObjectFull>;
  spotifyAlbums: SpotifyApi.AlbumObjectFull[];

  discogsSearchResults: Option<SearchResponseEntity[]>;
  discogsReleases: ReleasesEntity[];

  selectedSpotifyIdx: Option<number>;
  selectedDiscogsIdx: Option<number>;

  isLoadingSpotify: boolean;
  isLoadingDiscogs: boolean;

  showTrackAppearances: boolean;
  showSingles: boolean;
  showCompilations: boolean;
  
  showOtherResults: boolean;

  spotifyTracks: string[];
  discogsTracks: DiscogsTracks;

  error: Option<any>;
}
