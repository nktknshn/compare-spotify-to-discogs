import React, { useRef } from "react";
import {
  DirectionRow
} from "app/components/styled-common";
import { useSelector, useDispatch } from "Store";
import { setSelectedDiscogsIdx } from "Store/app/actions";
import { MAX_DISCOGS_RESULTS } from "app/modules/config";
// import { XSquare } from "react-feather";
import { openDiscogsArtistIdx } from "Store/app/epics";
import { isSome } from "fp-ts/lib/Option";
import { SwitchArtistLink } from "./spotify-header";
import styled, { css } from "app/styled";
// import { FaBeer as XSquare } from 'react-icons/fa'
import { Lock as XSquare } from 'styled-icons/material/Lock'
import { useOutsideClick } from "app/hooks/use-outside-click";

export const OtherResultsDiv = styled(DirectionRow)`
position: absolute
top: 0
left: 60vw
background-color: ${props => props.theme.controlsDivBackgroundColor};
padding: 8px
`

export const OtherResultsList = styled.ul`
margin-left: 0;
list-style: none
list-style-type: none
`

export const StyledSquare = styled(XSquare)`
color: ${props => props.theme.textMainColor}
`

const List = styled.ul`
list-style-type:none
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
