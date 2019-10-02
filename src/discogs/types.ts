export interface SearchPagination {
  per_page?: number,
  page?: number
}

export interface SearchQuery extends SearchPagination {
  query?: string,
  type?: EntityType,
  title?: string,
  release_title?: string,
  credit?: string,
  artist?: string,
  anv?: string,
  label?: string,
  genre?: string,
  style?: string,
  country?: string,
  year?: string | number,
  format?: string,
  catno?: string,
  barcode?: string,
  track?: string,
  submitter?: string,
  contributor?: string,
}

export interface SearchResponse {
  pagination: {
    per_page: number,
    items: number,
    page: number,
    urls: {},
    pages: number
  },
  results: SearchResponseEntity[]
}

export type SearchResponseEntity = SearchResponseRelease | SearchResponseArtist | SearchResponseMaster
export type EntityType = 'release' | 'master' | 'artist' | 'label'

export namespace SearchResponse {
  export const isRelease = (entity: SearchResponseEntity): entity is SearchResponseRelease =>
    entity.type === 'release'
  export const isMaster = (entity: SearchResponseEntity): entity is SearchResponseMaster =>
    entity.type === 'master'
  export const isArtist = (entity: SearchResponseEntity): entity is SearchResponseArtist =>
    entity.type === 'artist'
}

export interface SearchResponseRelease {
  user_data: UserData;
  community: Community;
  catno: string;
  year: string;
  id: number;
  style?: (string)[] | null;
  thumb: string;
  title: string;
  label?: (string)[] | null;
  master_id: number;
  type: 'release';
  format?: (string)[] | null;
  barcode?: (string)[] | null;
  master_url: string;
  genre?: (string)[] | null;
  country: string;
  uri: string;
  cover_image: string;
  resource_url: string;
}

export interface UserData {
  in_collection: boolean;
  in_wantlist: boolean;
}
export interface Community {
  have: number;
  want: number;
}

export interface SearchResponseArtist {
  thumb: string;
  title: string;
  user_data: UserData;
  master_url?: null;
  uri: string;
  cover_image: string;
  resource_url: string;
  master_id?: null;
  type: 'artist';
  id: number;
}

export interface SearchResponseMaster {
  user_data: UserData;
  community: Community;
  catno: string;
  year: string;
  id: number;
  style?: (null)[] | null;
  thumb: string;
  title: string;
  label?: (string)[] | null;
  master_id: number;
  type: 'master';
  format?: (string)[] | null;
  barcode?: (null)[] | null;
  master_url: string;
  genre?: (string)[] | null;
  country: string;
  uri: string;
  cover_image: string;
  resource_url: string;
}


export interface ArtistResponse {
  namevariations?: string[];
  profile: string;
  releases_url: string;
  resource_url: string;
  uri: string;
  urls?: string[];
  data_quality: string;
  id: number;
  images?: ImagesEntity[];
  members?: MembersEntity[];
  groups?: GroupsEntity[];
  name: string;
}

export interface GroupsEntity {
  active: boolean;
  resource_url: string;
  thumbnail_url: string;
  id: number;
  name: string;
}

export interface ImagesEntity {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
}
export interface MembersEntity {
  active: boolean;
  id: number;
  name: string;
  resource_url: string;
}

export interface ArtistReleasesResponse {
  pagination: Pagination;
  releases?: ReleasesEntity[];
}
export interface Pagination {
  per_page: number;
  items: number;
  page: number;
  urls: Urls;
  pages: number;
}
export interface Urls {
}
export interface ReleasesEntity {
  artist: string;
  id: number;
  main_release?: number | null;
  resource_url: string;
  role: string;
  thumb: string;
  title: string;
  type: string;
  year: number;
  format?: string | null;
  label?: string | null;
  status?: string | null;
}

export interface MasterReleaseResponse {
  styles?: (string)[] | null;
  genres?: (string)[] | null;
  videos?: (VideosEntity)[] | null;
  title: string;
  main_release: number;
  main_release_url: string;
  uri: string;
  artists?: ArtistsEntityOrExtraartistsEntity[];
  versions_url: string;
  year: number;
  images?: (ImagesEntity)[] | null;
  resource_url: string;
  tracklist?: (TracklistEntity)[] | null;
  id: number;
  num_for_sale: number;
  lowest_price: number;
  data_quality: string;
}
export interface VideosEntity {
  duration: number;
  description: string;
  embed: boolean;
  uri: string;
  title: string;
}
export interface ArtistsEntityOrExtraartistsEntity {
  join: string;
  name: string;
  anv: string;
  tracks: string;
  role: string;
  resource_url: string;
  id: number;
}
export interface ImagesEntity {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
}
export interface TracklistEntity {
  duration: string;
  position: string;
  type_: string;
  extraartists?: (ArtistsEntityOrExtraartistsEntity)[] | null;
  title: string;
}

export interface ReleaseResponse {
  title: string;
  id: number;
  artists?: ArtistsEntityOrExtraartistsEntity[];
  data_quality: string;
  thumb: string;
  community: Community;
  companies?: (CompaniesEntity)[] | null;
  country: string;
  date_added: string;
  date_changed: string;
  estimated_weight: number;
  extraartists?: (ArtistsEntityOrExtraartistsEntity)[] | null;
  format_quantity: number;
  formats?: (FormatsEntity)[] | null;
  genres?: (string)[] | null;
  identifiers?: (IdentifiersEntity)[] | null;
  images?: (ImagesEntity)[] | null;
  labels?: (LabelsEntity)[] | null;
  lowest_price: number;
  master_id: number;
  master_url: string;
  notes: string;
  num_for_sale: number;
  released: string;
  released_formatted: string;
  resource_url: string;
  series?: (null)[] | null;
  status: string;
  styles?: (string)[] | null;
  tracklist?: (TracklistEntity)[] | null;
  uri: string;
  videos?: (VideosEntity)[] | null;
  year: number;
}
export interface ArtistsEntityOrExtraartistsEntity {
  anv: string;
  id: number;
  join: string;
  name: string;
  resource_url: string;
  role: string;
  tracks: string;
}
export interface Community {
  contributors?: (ContributorsEntityOrSubmitter)[] | null;
  data_quality: string;
  have: number;
  rating: Rating;
  status: string;
  submitter: ContributorsEntityOrSubmitter;
  want: number;
}
export interface ContributorsEntityOrSubmitter {
  resource_url: string;
  username: string;
}
export interface Rating {
  average: number;
  count: number;
}
export interface CompaniesEntity {
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  name: string;
  resource_url: string;
}
export interface FormatsEntity {
  descriptions?: (string)[] | null;
  name: string;
  qty: string;
}
export interface IdentifiersEntity {
  type: string;
  value: string;
}
export interface ImagesEntity {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
}
export interface LabelsEntity {
  catno: string;
  entity_type: string;
  id: number;
  name: string;
  resource_url: string;
}
export interface TracklistEntity {
  duration: string;
  position: string;
  title: string;
  type_: string;
  artists: ArtistsEntityOrExtraartistsEntity[] | null
}

// export interface TracklistEntityArtist {
//   join: string;
//   name: string;
//   anv: string;
//   tracks: string;
//   thumbnail_url: string;
//   role: string;
//   resource_url: string;
//   id: number;
// }

export interface VideosEntity {
  description: string;
  duration: number;
  embed: boolean;
  title: string;
  uri: string;
}
