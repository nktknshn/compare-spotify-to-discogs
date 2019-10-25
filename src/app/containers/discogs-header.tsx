import { SmallSpinner } from 'app/components/spinner';
import { DirectionRow, TextSecondary } from "app/components/styled-common";
import { Space } from "Components/space";
import { sequenceT } from "fp-ts/lib/Apply";
import { fold, getOrElse, map, option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import React from "react";
import { useDispatch, useSelector } from "Store";
import { setShowOtherResults } from "Store/app/actions";
import styled from "styled-components";
import { getSelectedDiscogsSearchResult } from 'Store/selectors';

export const DiscogsArtistLink = styled.a<{ decoration?: string }>`
text-decoration: ${props => props.decoration || "underline"};
color: hsla(0, 100%, 100%, .66);
font-weight: bold;
`

const AlignRight = styled.div`
position: relative;
margin-left: auto;
left: -32px;
`

const tupleO = sequenceT(option)

const LoadingSpinner: React.FC<{ visible: boolean }> = ({ visible }) =>
  <div style={{ marginTop: 'auto' }}>{visible ? <SmallSpinner /> : <></>}</div>

export const DiscogsHeader: React.FunctionComponent = () => {
  const {
    discogsSearchResults,
    selectedDiscogsIdx,
    showOtherResults,
    isLoadingDiscogs,
    discogsGenres
  } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const isNothingFound = pipe(discogsSearchResults, fold(() => false, _ => _.length == 0))

  const selectedDiscogsResults = useSelector(getSelectedDiscogsSearchResult)

  if (isNothingFound)
    return <TextSecondary>Nothing found</TextSecondary>

  return pipe(
    selectedDiscogsResults,
    map(
      result =>
        <>
          <DirectionRow>
            <DiscogsArtistLink href={"https://discogs.com/artist/" + result.id}>
              {result.title}
            </DiscogsArtistLink>

            <LoadingSpinner visible={isLoadingDiscogs} />

            <Space />

            {discogsGenres.length > 0 &&
              <TextSecondary style={{ marginTop: 'auto' }}>({discogsGenres.slice(0, 5).join(", ")})</TextSecondary>
            }

            <AlignRight>
              <DiscogsArtistLink decoration="underline solid hsla(0, 100%, 100%, .33)" href="#"
                onClick={() => dispatch(setShowOtherResults(!showOtherResults))}>
                <TextSecondary>Other results...</TextSecondary>
              </DiscogsArtistLink>
            </AlignRight>
          </DirectionRow>
        </>)
    , getOrElse(() =>
      <LoadingSpinner visible={isLoadingDiscogs} />
    )
  )

};
