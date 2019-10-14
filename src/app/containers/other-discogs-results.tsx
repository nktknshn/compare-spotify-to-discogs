import React, { useRef } from "react";
import {
  DirectionRow
} from "app/components/styled-common";
import { useSelector, useDispatch } from "Store";
import { MAX_DISCOGS_RESULTS } from "app/modules/config";
import { openDiscogsArtistIdx } from "Store/app/epics";
import { isSome } from "fp-ts/lib/Option";
import { SwitchArtistLink } from "./spotify-header";
import styled, { css, keyframes } from "app/styled";
import { useOutsideClick } from "app/hooks/use-outside-click";


const popupAnimation = keyframes`
0%{
  transform: scale(0.3);
}
100%{
  transform: scale(1);
}
`

export const OtherResultsDiv = styled(DirectionRow)`
position: absolute;
top: 64px;
right: 5%;
background-color: ${props => props.theme.controlsDivBackgroundColor};
padding: 8px;
animation: ${popupAnimation} 0.1s;
`

const List = styled.ul`
list-style-type:none;
padding-left: 16px;
padding-right: 16px;
`

export const OtherDiscogsResults: React.FunctionComponent<{
  onClose: () => void
}> = ({ onClose }) => {
  const { discogsSearchResults, selectedDiscogsIdx } = useSelector(
    state => state.app
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose)

  return (
    <OtherResultsDiv ref={ref}>
      <List>
        {isSome(discogsSearchResults) &&
          discogsSearchResults.value
            .slice(0, MAX_DISCOGS_RESULTS)
            // .sort((a,b) => a.title.localeCompare(b.title))
            .map((_, idx) => (
              <li key={idx}>
                <SwitchArtistLink
                  href="#"
                  current={isSome(selectedDiscogsIdx) && selectedDiscogsIdx.value == idx}
                  onClick={() =>
                    dispatch(openDiscogsArtistIdx(idx))
                  }
                >
                  {_.title}
                </SwitchArtistLink>
              </li>
            ))}
      </List>
      {/* <StyledSquare onClick={onClose} size={20} /> */}
    </OtherResultsDiv>
  );
};
