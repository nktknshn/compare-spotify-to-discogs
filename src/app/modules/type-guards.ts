import { SpotifyCellItem, DiscogsCellItem } from "types";
import { ArtistReleaseOrMaster } from "typescript-discogs-client";
import { Track } from "Store/app/types";
// import * as DiscogsApi from 'discogs/_types'

export function isSpotifyAlbum(item: SpotifyCellItem): item is SpotifyApi.AlbumObjectFull {
    return item.type == 'album'
}

export function isSpotifyTrack(item: SpotifyCellItem): item is SpotifyApi.TrackObjectSimplified {
    return item.type == 'track'
}

export function isDiscogsRelease(item: DiscogsCellItem): item is ArtistReleaseOrMaster {
    return (typeof item !== 'string' && ("status" in item || "main_release" in item))
}

export function isDiscogsTrack(item: DiscogsCellItem): item is Track {
    return (typeof item !== 'string' && "duration" in item)
}
