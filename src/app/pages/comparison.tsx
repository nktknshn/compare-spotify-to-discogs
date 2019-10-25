import { Controls } from 'app/containers/controls';
import styled from 'app/styled';
import { FloatingSearchInput } from 'Components/floating-search-input';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "Store";
import { setShowOtherResults } from "Store/app/actions";
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search';
import { Play as PlayIcon } from 'styled-icons/fa-solid/Play';
import { DirectionColumns, DirectionRow } from "../components/styled-common";
import { OtherDiscogsResults as OtherDiscogsResults } from "../containers/other-discogs-results";
import { TableBodyGen } from "../containers/table-body-gen";
import { TableHeader } from "../containers/table-header";


const MainContainer = styled(DirectionColumns)`
display: flex;
justify-content: center;
align-items: center;
`

export const TableDiv = styled.div`
margin: auto;
width: calc(100% - 40px);
max-height: 95vh;
overflow-y: auto;
`

export const Table = styled.table`
border-collapse: collapse;
width: 100%;
`

export const ControlsDiv = styled(DirectionRow)`
margin-top: 12px;
font-size: small;
padding: 8px;
border-radius: 6px;
height: 2vh;
background-color: ${props => props.theme.controlsDivBackgroundColor};
`

const SearchInputTrigger = styled.div`
width: 32px;
height: 32px;
background-color: transparent;
color: ${props => props.theme.textMainColor};
position: absolute;
z-index: 1;
right: 0;
top: 0; 
padding: 4px;
cursor: pointer;
border-radius: 8px;
`

const RefreshTrigger = styled.div`
width: 28px;
height: 28px;
background-color: transparent;
color: ${props => props.theme.textMainColor};
position: absolute;
z-index: 1;
right: 0;
top: 38px; 
padding: 4px;
cursor: pointer;
border-radius: 8px;
`


export const ComparisonPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { accessToken, showOtherResults, currentTrack, artistId } = useSelector(state => state.app);

  const [showSearchInput, setShowSearchInput] = useState(false)

  return (
    <MainContainer>
      <TableDiv>
        <Table>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <TableBodyGen />
          </tbody>
        </Table>
      </TableDiv>
      <ControlsDiv>
        <Controls />
      </ControlsDiv>

      {showOtherResults &&
        <OtherDiscogsResults
          onClose={() => dispatch(setShowOtherResults(false))} />}

      {showSearchInput &&
        <FloatingSearchInput onClose={() => setShowSearchInput(false)} />}

      <SearchInputTrigger onClick={() => setShowSearchInput(true)}>
        <SearchIcon title="By Spotify URI"/>
      </SearchInputTrigger>

      <RefreshTrigger onClick={() => window.location.reload()}>
        <PlayIcon title="Current song"/>
      </RefreshTrigger>
      {/* <Error /> */}
    </MainContainer>
  )
} 