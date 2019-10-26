
import { SearchInput } from 'app/containers/search-input';
import { useOutsideClick } from 'app/hooks/use-outside-click';
import styled, { keyframes } from 'app/styled';
import React, { useRef } from 'react';
import { Overlay } from './styled-common';

const SearchInputContainer = styled.div`
background-color:  ${props => props.theme.controlsDivBackgroundColor};
padding: 8px;
width: 70vw;
margin: 128px auto;
`

const SmallerSearchInput = styled(SearchInput)`
font-size: ${props => props.theme.searchInputFontSizeFloating};
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