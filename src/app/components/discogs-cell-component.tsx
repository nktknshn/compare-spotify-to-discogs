import { TrackLink, TextSecondary } from "app/components/styled-common";
import { isDiscogsRelease, isDiscogsTrack } from "app/modules/type-guards";
import * as DiscogsApi from "discogs/types";
import { DiscogsCellItem } from "types";
import React from "react";
import { DiscogsCell } from "app/containers/table-row";
import { Space } from "Components/space";


export const DiscogsTrackComponent: React.FC<{ track: DiscogsApi.TracklistEntity }> =
  ({ track }) => <DiscogsCell>
    <TextSecondary>
      {track.position} {track.artists && " - " + track.artists.map(_ => _.name).join(", ")} - {track.title}
    </TextSecondary>
  </DiscogsCell>


export const DiscogsReleaseComponent: React.FunctionComponent<{
  item: DiscogsApi.ReleasesEntity;
  onClickRelease: (release: DiscogsApi.ReleasesEntity) => void;
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
