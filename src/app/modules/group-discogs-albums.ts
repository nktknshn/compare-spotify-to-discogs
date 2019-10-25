// import { ReleasesEntity, TracklistEntity } from "discogs/_types";
import { pipe } from 'fp-ts/lib/pipeable'
import { groupBy, NonEmptyArray, sort } from "fp-ts/lib/NonEmptyArray";
import { ord, ordString, ordNumber } from "fp-ts/lib/Ord";
import { flatten, map } from "fp-ts/lib/Array";
import { ArtistRelease, ArtistMaster } from 'typescript-discogs-client';
import { DiscogsTracks } from 'Store/app/types';

type Album = ArtistRelease | ArtistMaster
export const ordReleaseName = ord.contramap(ordString, (a: Album) => a.title)
export const ordId = ord.contramap(ordNumber, (a: Album) => a.id)

export const groupByYear = (albums: Album[]) =>
  pipe(
    albums,
    groupBy(a => String(a.year || 'NA'))
  )

export const expandReleases =
  (expandAlbums: DiscogsTracks) =>
    (albums: Array<Album>) =>
      pipe(
        albums,
        map(album => album.id in expandAlbums ? [album, ...expandAlbums[album.id]] : [album]),
        flatten
      )