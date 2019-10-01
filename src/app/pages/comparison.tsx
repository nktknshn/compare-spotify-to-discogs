import React from 'react';
import { useDispatch, useSelector } from "Store";
import { setShowOtherResults } from "Store/app/actions";
import { DirectionRow, DirectionColumns } from "../components/styled-common";
import { OtherResults } from "../containers/other-results";
import { TableBodyGen } from "../containers/table-body-gen";
import { TableHeader } from "../containers/table-header";
import styled from 'app/styled';
import { Controls } from 'app/containers/controls';

const MainContainer = styled(DirectionColumns)`

display: flex;
justify-content: center;
align-items: center;

background-color: ${props => props.theme.backgroundColor}
`

export const TableDiv = styled.div`
margin: 0 auto;
border-radius: 3px;

max-height: 95vh;
overflow-y: auto
border-collapse: collapse;

background-color: ${props => props.theme.backgroundColor}
`

export const Table = styled.table`
overflow-wrap:  anywhere;
`

export const ControlsDiv = styled(DirectionRow)`
margin-top: 12px
font-size: small
position: sticky
padding: 8px
border-radius: 6px;

top: 0
background-color: ${props => props.theme.controlsDivBackgroundColor};
`

export const ComparisonPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { accessToken, showOtherResults, currentTrack, artistId } = useSelector(state => state.app);

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
        <OtherResults
          onClose={() => dispatch(setShowOtherResults(false))} />}
    </MainContainer>
  )
} 