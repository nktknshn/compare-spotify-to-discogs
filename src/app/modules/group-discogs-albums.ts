import { ReleasesEntity, TracklistEntity } from "discogs/types";
import { pipe } from 'fp-ts/lib/pipeable'
import { groupBy, NonEmptyArray, sort } from "fp-ts/lib/NonEmptyArray";
import { ord, ordString } from "fp-ts/lib/Ord";
import { flatten, map } from "fp-ts/lib/Array";

type Album = ReleasesEntity
export const ordReleaseName = ord.contramap(ordString, (a: Album) => a.title)

export const groupByYear = (albums: Album[]) =>
  pipe(
    albums,
    groupBy(a => String(a.year || 'NA'))
  )

export const expandReleases =
  (expandAlbums: { [releaseId: number]: TracklistEntity[] }) =>
    (albums: Array<Album>) =>
      pipe(
        albums,
        map(album => album.id in expandAlbums ? [album, ...expandAlbums[album.id]] : [album]),
        flatten
      )