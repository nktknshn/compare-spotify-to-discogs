import { flatten, map } from "fp-ts/lib/Array";
import { eqString, fromEquals } from "fp-ts/lib/Eq";
import { groupBy } from "fp-ts/lib/NonEmptyArray";
import { ord, ordString } from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import { extractYear } from "./extract-year";

type Album = SpotifyApi.AlbumObjectFull;

export const eqAlbumName = fromEquals((a: Album, b: Album) =>
  eqString.equals(a.name.toLowerCase(), b.name.toLowerCase())
);

const eqYear = fromEquals(
  (a: Album, b: Album) =>
    extractYear(a.release_date) == extractYear(b.release_date)
);

export const ordAlbumName = ord.contramap(ordString, (a: Album) => a.name);

export const groupByYear = (spotifyAlbums: Album[]) =>
  pipe(
    spotifyAlbums,
    groupBy(a => String(extractYear(a.release_date)))
  );

export const expandAlbums = (expandAlbums: string[]) => (
  albums: Array<Album>
) =>
  pipe(
    albums,
    map(album =>
      expandAlbums.find(_ => _ == album.id)
        ? [album, ...album.tracks.items]
        : [album]
    ),
    flatten
  );
