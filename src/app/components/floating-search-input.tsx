
import { SearchInput } from 'app/containers/search-input';
import { useOutsideClick } from 'app/hooks/use-outside-click';
import styled from 'app/styled';
import React, { useRef } from 'react';


const SearchInputContainer = styled.div`
background-color:  ${props => props.theme.controlsDivBackgroundColor};
padding: 8px
width: 70vw;
margin: 128px auto;
`

const Overlay = styled.div`
position: fixed
background-color: ${props => props.theme.controlsDivBackgroundColor};
z-index: 2
top: 0
left: 0
width: 100%
height: 100%
opacity: 0.9;
`

const SmallerSearchInput = styled(SearchInput)`
font-size: 22px
`

export const FloatingSearchInput: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose)

  return (
    <Overlay>
      <SearchInputContainer ref={ref}>
        <SmallerSearchInput />
      </SearchInputContainer>
    </Overlay>)
}