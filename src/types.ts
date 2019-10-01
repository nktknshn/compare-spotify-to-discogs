import * as DiscogsApi from 'discogs/types'
import { These, Both } from 'fp-ts/lib/These'
import { Left, Right } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'

export type RowItem = readonly [
    Option<SpotifyCellItem>, Option<string>, Option<DiscogsCellItem>
]

export type YearCellItem = string

export type SpotifyCellItem = SpotifyApi.TrackObjectSimplified | SpotifyApi.AlbumObjectFull
export type DiscogsCellItem = DiscogsApi.ReleasesEntity | DiscogsApi.TracklistEntity

export type CellItem = SpotifyCellItem | DiscogsCellItem