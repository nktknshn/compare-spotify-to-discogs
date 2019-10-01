import React from 'react'
import { SpotifyHeader } from './spotify-header'
import { DiscogsHeader } from './discogs-header'
import styled from 'app/styled'
// import { bgMainColor } from 'app/components/styled-common'

const HeaderArtists = styled.th`
padding-bottom: 4px
padding-left: 8px
position: sticky;
top: 0;
background-color: ${props => props.theme.backgroundColor}
`

const HeaderCaption = styled.th`
background-color: hsl(0, 0%, 8%);
border: 0
`

const HeaderRowCaption = styled.tr`
color: hsla(0, 100%, 100%, .66);
border-collapse: collapse;
border: 0
`

const HeaderRowArtists = styled.tr`
color: hsla(0, 100%, 100%, .66);
padding: 4px;
text-align: left
background-color: ${props => props.theme.backgroundColor}
`

const YaerHead = styled.th`
background-color: hsl(0, 0%, 8%);
border: 0
`

export const TableHeader = () => (<>
  <HeaderRowArtists>
    <HeaderArtists>
      <SpotifyHeader />
    </HeaderArtists>
    
    <HeaderArtists />
    
    <HeaderArtists>
      <DiscogsHeader />
    </HeaderArtists>
  </HeaderRowArtists>

  <HeaderRowCaption>
    <HeaderCaption>Spotify</HeaderCaption>
    <YaerHead></YaerHead>
    <HeaderCaption>Discogs</HeaderCaption>
  </HeaderRowCaption>
</>)