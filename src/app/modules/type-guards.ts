import { SpotifyCellItem, DiscogsCellItem } from "types";
import * as DiscogsApi from 'discogs/types'

export function isSpotifyAlbum(item: SpotifyCellItem): item is SpotifyApi.AlbumObjectFull {
    return item.type == 'album'
}

export function isSpotifyTrack(item: SpotifyCellItem): item is SpotifyApi.TrackObjectSimplified {
    return item.type == 'track'
}

export function isDiscogsRelease(item: DiscogsCellItem): item is DiscogsApi.ReleasesEntity {
    return (typeof item !== 'string' && ("status" in item || "main_release" in item))
}

export function isDiscogsTrack(item: DiscogsCellItem): item is DiscogsApi.TracklistEntity {
    return (typeof item !== 'string' && "duration" in item)
}

// export function isDiscogsString(item: DiscogsCellItem): item is string {
//     return typeof item === 'string'
// }