import React from "react";
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
import { FaBeer as XSquare } from 'react-icons/fa'

export const OtherResultsDiv = styled(DirectionRow)`
position: absolute
top: 0
left: 60vw
background-color: hsl(0, 0%, 4%);
padding: 8px
`

export const OtherResultsList = styled.ul`
margin-left: 0;
list-style: none
list-style-type: none
`

const _XSquare: React.FC<{
  onClick: () => void
  size: number
}> = ({ onClick }) =>
    <div onClick={onClick}><span>X</span></div>


export const StyledSquare = styled(XSquare)`
color: ${props => props.theme.textMainColor}
`

const List = styled.ul`
list-style-type:none
`

export const OtherResults: React.FunctionComponent<{
  onClose: () => void
}> = ({ onClose }) => {
  const { discogsSearchResults, selectedDiscogsIdx } = useSelector(
    state => state.app
  );
  const dispatch = useDispatch();

  return (
    <OtherResultsDiv>
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
      <StyledSquare onClick={onClose} size={20} />
    </OtherResultsDiv>
  );
};
