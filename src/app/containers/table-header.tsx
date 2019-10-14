import React from 'react'
import { SpotifyHeader } from './spotify-header'
import { DiscogsHeader } from './discogs-header'
import styled from 'app/styled'
// import { bgMainColor } from 'app/components/styled-common'

const HeaderArtists = styled.th`
padding-bottom: 8px;
padding-top: 8px;
padding-left: 8px;
position: sticky;
top: 0;
background-color: ${props => props.theme.tableHeaderColor};
`

const HeaderCaption = styled.th`
padding-bottom: 4px;
// padding-top: 2px;
`

const HeaderRow = styled.tr`
color:  ${props => props.theme.textMainColor};
`

const HeaderRowArtists = styled.tr`
color: hsla(0, 100%, 100%, .66);
text-align: left;
`


export const TableHeader = () => (
  <>
    <HeaderRow>
      <HeaderCaption>Spotify</HeaderCaption>
      <HeaderCaption></HeaderCaption>
      <HeaderCaption>Discogs</HeaderCaption>
    </HeaderRow>

    <HeaderRowArtists>
      <HeaderArtists>
        <SpotifyHeader />
      </HeaderArtists>

      <HeaderArtists>
      </HeaderArtists>

      <HeaderArtists>
        <DiscogsHeader />
      </HeaderArtists>
    </HeaderRowArtists>
  </>)