import { DiscogsReleaseComponent, DiscogsTrackComponent } from "app/components/discogs-cell-component";
import { SpotifyAlbumComponent, SpotifyTrackComponent } from 'app/components/spotify-cell-component'
import { TextMain, TextSecondary, YearWidth } from 'app/components/styled-common'
import { isSpotifyAlbum, isSpotifyTrack, isDiscogsRelease, isDiscogsTrack } from 'app/modules/type-guards'
import { isNone, isSome } from 'fp-ts/lib/Option'
import { RowItem, SpotifyCellItem } from 'types'
import React from 'react'
import { useDispatch, useSelector } from 'Store'
import { addSpotifyAlbumTracks } from 'Store/app/actions'
import { toggleDiscogsReleaseTracks, toggleSpotifyReleaseTracks } from 'Store/app/epics'
import * as DiscogsApi from 'discogs/types'
import styled from 'app/styled'

export const Row = styled.tr<{year?: boolean}>`

`

const Cell = styled.td`
border-bottom: 1px solid ${props => props.theme.tableBorderColor};
padding-top: 2px 
padding-bottom: 2px
` 

export const CellYear = styled(Cell)`
padding-left: 4px
padding-right: 8px
width: ${YearWidth}
font-size: small
`

export const SpotifyCell = styled(Cell)`
min-width: 40vw
text-align: right
`

export const DiscogsCell = styled(Cell)`
min-width: 40vw
`


export const EmptyCell = styled(Cell)`
`

export const TableRow: React.FunctionComponent<{
  row: RowItem;
}> = ({ row }) => {

  const { currentTrack, spotifyArtists } = useSelector(s => s.app)

  const dispatch = useDispatch()

  const handleClickAlbum = (album: SpotifyApi.AlbumObjectFull) =>
    dispatch(toggleSpotifyReleaseTracks(album))

  const handleClickRelease = (release: DiscogsApi.ReleasesEntity) =>
    dispatch(toggleDiscogsReleaseTracks(release))

  const isCurrentAlbum = (album: SpotifyApi.AlbumObjectFull) =>
    isSome(currentTrack) && album.id == currentTrack.value.album.id

  const isCurrentTrack = (track: SpotifyApi.TrackObjectSimplified) =>
    isSome(currentTrack) && currentTrack.value.id == track.id


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
      {isNone(middle) && <EmptyCell/>}

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