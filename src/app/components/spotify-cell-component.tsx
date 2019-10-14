import { TrackLink, TextSecondary } from "app/components/styled-common";
import React from "react";
import { SpotifyCell } from "app/containers/table-row";
import { Space } from "./space";


export const SpotifyTrackComponent: React.FC<{
  track: SpotifyApi.TrackObjectSimplified
  current: boolean
}
> = ({ track, current }) =>
    <SpotifyCell>
      {current && <TextSecondary>▶<Space /></TextSecondary>}
      <TextSecondary>
        {track.artists.map(_ => _.name).join(", ")} - {track.name} - {track.track_number}
      </TextSecondary>
    </SpotifyCell>


export const SpotifyAlbumComponent: React.FunctionComponent<{
  album: SpotifyApi.AlbumObjectFull;
  onClickAlbum: (album: SpotifyApi.AlbumObjectFull) => void;
  current: boolean;
}> = ({
  album,
  onClickAlbum,
  current
}) => {
    return (
      <SpotifyCell>
        <TrackLink current={current} href={album.external_urls["spotify"]}>
          <TextSecondary>{album.album_type}</TextSecondary>
        </TrackLink>
        <Space />

        {current && <TextSecondary>▶<Space /></TextSecondary>}

        <TrackLink current={current} href='#' onClick={() => onClickAlbum(album)}>
          {album.name}
        </TrackLink>
      </SpotifyCell>
    );
  };
