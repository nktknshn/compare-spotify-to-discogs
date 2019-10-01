import { TextMain, TextSecondary } from "app/components/styled-common";
import { makeTableRows } from "app/modules/make-table-rows";
import React from "react";
import { useDispatch, useSelector } from "Store";
import { TableRow } from "./table-row";
import { SpotifyCellItem, DiscogsCellItem } from "types";
import * as DiscogsApi from '../../discogs/types'
import { map, flatten, uniq, sort, filter } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { eqAlbumName, ordAlbumName } from "app/modules/group-albums-spotify";
import { HIDDEN_DISCOGS_ROLES } from "app/modules/config";
import { ordReleaseName } from "app/modules/group-discogs-albums";


const filterDiscogsReleasesRoles = (withoutRoles: string[]) =>
  (rs: DiscogsApi.ReleasesEntity[]) =>
    rs
      .filter(_ => withoutRoles.indexOf(_.role) == -1)

const filterSpotifyReleasesTypes = (opts: { showSingles: boolean, showCompilations: boolean }) =>
  (releases: SpotifyApi.AlbumObjectFull[]) =>
    pipe(
      releases,
      filter(_ => opts.showSingles || _.album_type != 'single'),
      filter(_ => opts.showCompilations || _.album_type != 'compilation'),
    )
    
export const TableBodyGen: React.FunctionComponent = () => {
  const {
    spotifyAlbums,
    spotifyTracks,
    discogsReleases,
    discogsTracks,
    showSingles,
    showTrackAppearances,
    showCompilations
  } = useSelector(state => state.app);

  const rows = makeTableRows(
    {
      spotifyAlbums:
        pipe(
          spotifyAlbums,
          filterSpotifyReleasesTypes({ showSingles, showCompilations }),
          sort(ordAlbumName),
          uniq(eqAlbumName)
        ),
      discogsReleases:
        pipe(
          discogsReleases,
          filterDiscogsReleasesRoles([
            ...HIDDEN_DISCOGS_ROLES,
            ...(!showTrackAppearances ? ['TrackAppearance'] : [])
          ]),
          sort(ordReleaseName)
        ),
      spotifyTracks,
      discogsTracks
    });

  return (
    <>
      {rows.map((row, idx) => (
        <TableRow key={idx} row={row} />
      ))}
    </>
  );
};
