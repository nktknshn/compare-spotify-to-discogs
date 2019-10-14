import { TextSecondary, TrackLink } from "app/components/styled-common";
import { DiscogsCell } from "app/containers/table-row";
import { Space } from "Components/space";
import React from "react";
import { Track } from "Store/app/types";
import styled from "Styles";
import { ArtistReleaseOrMaster, MasterArtist, ReleaseArtist } from "typescript-discogs-client";

export const TrackArtistLink = styled.a`
color: ${props => props.theme.textSecondaryColor};
text-decoration: none;
`

const artistsToLinks = (artists: (ReleaseArtist | MasterArtist)[]) =>
  artists.map(a =>
    <TrackArtistLink href={"https://discogs.com/artist/" + a.id}>{a.name}</TrackArtistLink>
  )

export const DiscogsTrackComponent: React.FC<{ track: Track }> =
  ({ track }) => <DiscogsCell>
    <TextSecondary>
      {track.position}
      <Space />
      {track.extraartists && <> <span> - </span>{artistsToLinks(track.extraartists)}</>}
      <Space />
      - {track.title}
    </TextSecondary>
  </DiscogsCell>


export const DiscogsReleaseComponent: React.FunctionComponent<{
  item: ArtistReleaseOrMaster;
  onClickRelease: (release: ArtistReleaseOrMaster) => void;
}> = ({ item: discogs, onClickRelease }) => {
  return (
    <DiscogsCell>
      <TrackLink
        href='#'
        onClick={() => onClickRelease(discogs)}>
        {discogs.title}
      </TrackLink>
      <Space />
      <TrackLink
        href={"https://discogs.com/" + discogs.type + "/" + discogs.id}>
        <TextSecondary>{discogs.role}</TextSecondary>
      </TrackLink>
    </DiscogsCell>
  );
};
