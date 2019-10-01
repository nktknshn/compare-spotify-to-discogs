
import { alignArray } from "fp-ts-contrib/lib/Align/Array";
import { flatten, map, sort } from "fp-ts/lib/Array";
import { none, some } from "fp-ts/lib/Option";
import { ordString } from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import { keys } from "fp-ts/lib/Record";
import { getLeft, getRight } from "fp-ts/lib/These";
import { expandAlbums, groupByYear as groupByYearSpotify } from "Modules/group-albums-spotify";
import { expandReleases, groupByYear as groupByYearDiscogs } from "Modules/group-discogs-albums";
import { AppState } from "Store/app/types";
import { RowItem } from "types";
import { uniq } from "./uniq";


export const makeTableRows = (
  opts: {
    spotifyAlbums: AppState['spotifyAlbums'],
    discogsReleases: AppState['discogsReleases'],
    spotifyTracks: AppState['spotifyTracks'],
    discogsTracks: AppState['discogsTracks'],
  }
): RowItem[] => {

  const groupedSpotify = groupByYearSpotify(opts.spotifyAlbums);
  const groupedDiscogs = groupByYearDiscogs(opts.discogsReleases);

  const years = uniq(
    keys(groupedSpotify), keys(groupedDiscogs),
  );

  return pipe(
    years,
    sort(ordString),
    map(year => {
      const albumsByYear = pipe(
        groupedSpotify[year] ? groupedSpotify[year] : [],
        expandAlbums(opts.spotifyTracks)
      );

      const releasesByYear = pipe(
        groupedDiscogs[year] ? groupedDiscogs[year] : [],
        expandReleases(opts.discogsTracks)
      );

      const yearRow = [none, some(year), none] as const;

      const yearRows = pipe(
        alignArray.align(albumsByYear, releasesByYear),
        map(these =>
          [getLeft(these), none, getRight(these)] as const
        )
      );

      return [yearRow, ...yearRows];
    }),
    flatten
  );
}