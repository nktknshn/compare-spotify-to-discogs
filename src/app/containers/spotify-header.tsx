import React from "react";
import { useSelector, useDispatch } from "Store";
import { DirectionColumns, TextSecondary } from "app/components/styled-common";
import { setSelectedSpotifyIdx } from "Store/app/actions";
import { openSpotifyArtistIdx } from "Store/app/epics";
import { isSome, map, getOrElse, chain, some, none } from "fp-ts/lib/Option";
import Spinner from 'Components/spinner'
import styled from "Styles";
import { pipe } from "fp-ts/lib/pipeable";
import { Space } from "Components/space";

export const SwitchArtistLink = styled.a<{ current: boolean }>`
color: ${props => props.theme.textMainColor};
font-weight: ${(props) => props.current ? 'bold' : 'normal'}
`
// color: ${props => props.current ? props.theme.textMainColor : props.theme.textSecondaryColor};

export const SpotifyHeader: React.FunctionComponent = () => {
  const { spotifyArtists, selectedSpotifyIdx, isLoadingSpotify, spotifyArtistFull } = useSelector(
    state => state.app
  );
  const dispatch = useDispatch();

  const Styles = () => pipe(
    spotifyArtistFull,
    map(_ => _.genres),
    map(_ => _.join(", ")),
    chain(_ => _.length > 0 ? some(<span>{`(${_})`}</span>) : none),
    getOrElse(() => <span></span>)
  )

  return (
    <>
      {isLoadingSpotify && <Spinner size={10} />}

      {spotifyArtists.map((_, idx) => (
        <React.Fragment key={idx}>
          <SwitchArtistLink
            href='#'
            current={isSome(selectedSpotifyIdx) && selectedSpotifyIdx.value == idx}
            onClick={() => dispatch(openSpotifyArtistIdx(idx))}
          >
            {_.name}
          </SwitchArtistLink>
          
          {isSome(selectedSpotifyIdx) && selectedSpotifyIdx.value == idx && <TextSecondary>
            <Space />
            <Styles />
          </TextSecondary>}

          &nbsp;
                </React.Fragment>
      ))}
    </>
  );
};
