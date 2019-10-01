import React from "react";
import { useSelector, useDispatch } from "Store";
import { TextSecondary } from "app/components/styled-common";
import { setShowOtherResults } from "Store/app/actions";
import { isNone, isSome, fold, option, map, getOrElse } from "fp-ts/lib/Option";
import styled from "styled-components";
import Spinner, { SmallSpinner } from 'app/components/spinner'
import { pipe } from "fp-ts/lib/pipeable";
import { sequenceT } from "fp-ts/lib/Apply";
import { Space } from "Components/space";

export const DiscogsArtistLink = styled.a<{decoration?: string}>`
text-decoration: ${props => props.decoration || "underline"};
color: hsla(0, 100%, 100%, .66);
font-weight: normal
`

const tupleO = sequenceT(option)

const LoadingSpinner: React.FC<{ visible: boolean }> = ({ visible }) => visible ? <SmallSpinner /> : <></>

export const DiscogsHeader: React.FunctionComponent = () => {
  const {
    discogsSearchResults,
    selectedDiscogsIdx,
    showOtherResults,
    isLoadingDiscogs
  } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const isNothingFound = pipe(discogsSearchResults, fold(() => false, _ => _.length == 0))

  if (isNothingFound)
    return <TextSecondary>Nothing found</TextSecondary>

  return pipe(
    tupleO(selectedDiscogsIdx, discogsSearchResults),
    map(
      ([id, results]) =>
        <>
          <DiscogsArtistLink href={"https://discogs.com/artist/" + results[id].id}>
            {results[id].title} 
          </DiscogsArtistLink>
          <Space />
          <DiscogsArtistLink decoration="underline solid hsla(0, 100%, 100%, .33)" href="#"
            onClick={() => dispatch(setShowOtherResults(!showOtherResults))}>
            <TextSecondary>Other results...</TextSecondary>
          </DiscogsArtistLink>
          <LoadingSpinner visible={isLoadingDiscogs} />
        </>)
    , getOrElse(() =>
      <LoadingSpinner visible={isLoadingDiscogs} />
    )
  )

};
