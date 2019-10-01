import { DiscogsReleaseComponent, DiscogsTrackComponent } from "app/components/discogs-cell-component";
// import { SpotifyCellComponent } from "app/components/spotify-cell-component";
import { TextMain } from "app/components/styled-common";
import { expandAlbums, groupByYear as groupByYearSpotify, ordAlbumName } from "app/modules/group-albums-spotify";
import { expandReleases, groupByYear as groupByYearDiscogs, ordReleaseName } from "app/modules/group-discogs-albums";
import { alignArray } from "fp-ts-contrib/lib/Align/Array";
import { flatten, map, sort, uniq } from "fp-ts/lib/Array";
import { eqString } from "fp-ts/lib/Eq";
import { none, some, getOrElse } from "fp-ts/lib/Option";
import { ordString } from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import { keys } from "fp-ts/lib/Record";
import { getLeft, getRight } from "fp-ts/lib/These";
import React from "react";
import { useDispatch, useSelector } from "Store";
import { toggleDiscogsReleaseTracks, toggleSpotifyReleaseTracks } from "Store/app/epics";
import { DiscogsCellItem, RowItem, SpotifyCellItem } from "types";


// const NowPlayingAlbum = () => <td><TextMain>▶</TextMain></td>
// const NowPlayingTrack = () => <td><TextSecondary>▶</TextSecondary></td>
// const YearCell = ({ year }: { year: string }) => <CellYear>{year}</CellYear>
// const EmptyCell = () => <td />
const TextCell: React.FunctionComponent = (props) => <td><TextMain>{props.children}</TextMain></td>


interface SpotifyCell {
  tag: 'spotify',
  item: SpotifyCellItem
}

interface DiscogsCell {
  tag: 'discogs',
  item: DiscogsCellItem
}

interface YearCell {
  tag: 'year',
  year: string
}

interface NowPlayingAlbumCell {
  tag: 'nowplayingalbum'
}

interface NowPlayingTrackCell {
  tag: 'nowplayingtrack'
}

interface TextCell {
  tag: 'text',
  value: string
}

interface EmptyCell {
  tag: 'empty',
}

type CellType = SpotifyCell | DiscogsCell | YearCell | NowPlayingAlbumCell | NowPlayingTrackCell | TextCell | EmptyCell

export const TableBodyGen: React.FunctionComponent = () => {
  const {
    spotifyAlbums,
    spotifyTracks,
    discogsReleases,
    discogsTracks,
    currentTrack,
    isLoadingDiscogs,
    isLoadingSpotify,
  } = useSelector(state => state.app);

  const dispatch = useDispatch();

  const table: CellType[][] = [
    [{ tag: 'empty' }], [{ tag: 'year', year: '2019' }], [{ tag: 'empty' }],
  ]

  // const cellToJsx = (c: CellType): JSX.Element => {
  //   switch (c.tag) {
  //     case 'empty': return <td />
  //     // case 'year': return <CellYear>{c.year}</CellYear>
  //     case 'nowplayingalbum': return <TextMain>▶</TextMain>
  //     case 'nowplayingtrack': return <TextMain>▶</TextMain>
  //     case 'spotify': return (
  //       <SpotifyCellComponent
  //         item={c.item}
  //         current={false}
  //         onClickAlbum={(album) => dispatch(toggleSpotifyReleaseTracks(album))} />
  //     )
  //     case 'discogs': return (
  //       <DiscogsCellComponent
  //         item={c.item}
  //         onClickRelease={(release) => dispatch(toggleDiscogsReleaseTracks(release))}
  //       />
  //     )
  //     case 'text': return <TextCell>{c.value}</TextCell>
  //   }
  // }

  const groupedSpotify = groupByYearSpotify(spotifyAlbums);
  const groupedDiscogs = groupByYearDiscogs(discogsReleases);

  const years = pipe(
    keys(groupedSpotify).concat(keys(groupedDiscogs)),
    uniq(eqString),
    sort(ordString)
  );

  // const rows: CellType[][] = pipe(
  //   years,
  //   map(year => {
  //     const albumsByYear = pipe(
  //       groupedSpotify[year] ? groupedSpotify[year].sort(ordAlbumName.compare) : [],
  //       expandAlbums(spotifyTracks)
  //     );

  //     const releasesByYear = pipe(
  //       groupedDiscogs[year] ? groupedDiscogs[year].sort(ordReleaseName.compare) : [],
  //       expandReleases(discogsTracks)
  //     );

  //     const empty: CellType = { tag: 'empty' }
  //     const yearRow: CellType[] = [empty, { tag: 'year', year: '2019' }, empty];

  //     const yearRows: CellType[][] = pipe(
  //       alignArray.align(albumsByYear, releasesByYear),
  //       map(these => [pipe(getLeft(these), map(),  getOrElse(empty)), none, getRight(these)])
  //     );

  //     return [yearRow, ...yearRows];
  //   }),
  //   flatten
  // );

  return (
    <>

    </>
  );
};
