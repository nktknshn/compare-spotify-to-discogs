import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'Store'
import { setArtistId } from 'Store/app/actions'
import { some, fold, Option, none } from 'fp-ts/lib/Option'
import { loadSearchInputSpotifyArtistId } from 'Store/app/epics-spotify'
import { pipe } from 'fp-ts/lib/pipeable'
import { parseSpotifyUrl } from 'Modules/parse-spotify-url'
import { SearchInput } from 'app/containers/search-input'


const Container = styled.div`
justify-content: center;
align-items: center;
display: flex;
height: calc(40vh - 128px);
`

export const SearchPage: React.FunctionComponent = () => {

  const dispatch = useDispatch()
  const [value, setValue] = useState("")

  return (
    <Container>
      <SearchInput />
    </Container>
  )
} 