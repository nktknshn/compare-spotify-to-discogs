// import * as DiscogsApi from 'discogs/_types'
import { These, Both } from 'fp-ts/lib/These'
import { Left, Right } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { ArtistReleaseOrMaster } from 'typescript-discogs-client'
import { MasterTrack } from 'typescript-discogs-client/dist/types/master'
import { ReleaseTrack } from 'typescript-discogs-client/dist/types/release'

export type RowItem = readonly [
    Option<SpotifyCellItem>, Option<string>, Option<DiscogsCellItem>
]

export type YearCellItem = string

export type SpotifyCellItem = SpotifyApi.TrackObjectSimplified | SpotifyApi.AlbumObjectFull
export type DiscogsCellItem = ArtistReleaseOrMaster | (MasterTrack | ReleaseTrack)

export type CellItem = SpotifyCellItem | DiscogsCellItem