import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'Store'
import { setArtistId } from 'Store/app/actions'
import { some, fold, Option, none } from 'fp-ts/lib/Option'
import { loadSpotifyArtistId } from 'Store/app/epics'
import { pipe } from 'fp-ts/lib/pipeable'

const SearchInput = styled.input`
width: 80ch;
line-height: 24px;
padding-left: 8px;
font-size: 22px;
background-color: inherit;
color: hsla(0, 100%, 100%, .88);
border-color: transparent;
border-radius: 3px;
`

const Container = styled.div`
justify-content: center;
align-items: center;
display: flex;
height: 50vh;
`

const SearchDiv = styled.div`
background-color: hsl(0, 0%, 11%);
padding: 4px;
margin: 0 auto;
border-radius: 3px;
`
const parseSpotifyUrl = (url: string): Option<string> => {
  const id = url.substr(15, 24)
  return id.length > 0 ? some(id): none
}

export const SearchPage: React.FunctionComponent = () => {

  const dispatch = useDispatch()
  const [value, setValue] = useState("")

  return (
    <Container>
      <SearchDiv>
        <SearchInput
          value={value}
          placeholder="spotify:artist:35IWrq7ZFSjxVZyMPyzAbU"
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) =>
            e.keyCode == 13 && pipe(
              parseSpotifyUrl(value),
              fold(
                () => { },
                (id) => dispatch(loadSpotifyArtistId(id))
              ))
          } />
      </SearchDiv>
    </Container>
  )
} 