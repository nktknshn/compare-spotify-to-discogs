import { HIDDEN_DISCOGS_ROLES } from "app/modules/config";
import { eqAlbumName, ordAlbumName } from "app/modules/group-albums-spotify";
import { ordReleaseName } from "app/modules/group-discogs-albums";
import { makeTableRows } from "app/modules/make-table-rows";
import { filter, sort, uniq } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import React from "react";
import { useSelector } from "Store";
// import * as DiscogsApi from '../../discogs/_types';
import { TableRow } from "./table-row";
import Discogs from 'typescript-discogs-client'

const filterDiscogsReleasesRoles = (withoutRoles: string[]) =>
  (rs: Discogs.ArtistReleaseOrMaster[]) =>
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
    showCompilations,
    showMainReleases
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
            ...(!showTrackAppearances ? ['TrackAppearance'] : []),
            ...(!showMainReleases ? ['Main'] : [])
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
