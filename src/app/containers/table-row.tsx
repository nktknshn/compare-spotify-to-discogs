import { DiscogsReleaseComponent, DiscogsTrackComponent } from "app/components/discogs-cell-component";
import { SpotifyAlbumComponent, SpotifyTrackComponent } from 'app/components/spotify-cell-component';
import { TextMain, YearWidth } from 'app/components/styled-common';
import { isDiscogsRelease, isDiscogsTrack, isSpotifyAlbum, isSpotifyTrack } from 'app/modules/type-guards';
import styled from 'app/styled';
import Discogs from 'typescript-discogs-client';
import { isNone, isSome, map } from 'fp-ts/lib/Option';
import { pipe } from "fp-ts/lib/pipeable";
import React from 'react';
import { useDispatch, useSelector } from 'Store';
import { toggleDiscogsReleaseTracks } from "Store/app/epics-discogs";
import { toggleSpotifyReleaseTracks } from "Store/app/epics-spotify";
import { getSelectedSpotifyArtist } from "Store/selectors";
import { RowItem } from 'types';

export const Row = styled.tr<{ year?: boolean }>``

const Cell = styled.td`
border-bottom: 1px solid ${props => props.theme.tableBorderColor};
padding-top: 2px;
padding-bottom: 2px;
`

export const CellYear = styled(Cell)`
padding-left: 4px;
padding-right: 4px;
// padding-top: 32px;
width: ${YearWidth};
font-size: small;
`

export const SpotifyCell = styled(Cell)`
min-width: 40vw;
text-align: right;
`

export const DiscogsCell = styled(Cell)`
min-width: 40vw;
`


export const EmptyCell = styled(Cell)`
`

export const TableRow: React.FunctionComponent<{
  row: RowItem;
}> = ({ row }) => {

  const { currentTrack, spotifyArtists } = useSelector(s => s.app)
  const currentSpotifyArtist = useSelector(getSelectedSpotifyArtist)

  const dispatch = useDispatch()

  const handleClickAlbum = (album: SpotifyApi.AlbumObjectFull) =>
    dispatch(toggleSpotifyReleaseTracks(album))

  const handleClickRelease = (release: Discogs.ArtistReleaseOrMaster) =>
    dispatch(toggleDiscogsReleaseTracks(release))

  const isCurrentAlbum = (album: SpotifyApi.AlbumObjectFull) =>
    isSome(currentTrack) && album.id == currentTrack.value.album.id

  const isCurrentTrack = (track: SpotifyApi.TrackObjectSimplified) =>
    isSome(currentTrack) && currentTrack.value.id == track.id

  const getTrackArtists = (track: SpotifyApi.TrackObjectSimplified) =>
    pipe(
      currentSpotifyArtist,
      map(artist =>
        track.artists.map(_ => _.id) == [artist.id]
        ? [] as SpotifyApi.ArtistObjectSimplified[]
        : artist
      )
    )

  const [left, middle, right] = row

  return (
    <Row>

      {isNone(left) && <SpotifyCell />}
      {isSome(left) && isSpotifyAlbum(left.value) &&
        <SpotifyAlbumComponent
          album={left.value}
          current={isCurrentAlbum(left.value)}
          onClickAlbum={handleClickAlbum}
        />
      }

      {isSome(left) && isSpotifyTrack(left.value) &&
        <SpotifyTrackComponent
          track={left.value}
          current={isCurrentTrack(left.value)}
        />
      }

      {isSome(middle) && <CellYear><TextMain>{middle.value}</TextMain></CellYear>}
      {isNone(middle) && <EmptyCell />}

      {isNone(right) && <DiscogsCell />}
      {isSome(right) && isDiscogsRelease(right.value) &&
        <DiscogsReleaseComponent
          item={right.value}
          onClickRelease={handleClickRelease} />}

      {isSome(right) && isDiscogsTrack(right.value) &&
        <DiscogsTrackComponent
          track={right.value} />}
    </Row>
  )
}