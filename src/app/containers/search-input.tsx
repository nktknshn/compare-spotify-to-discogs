import React, { useState } from 'react'
import styled from 'Styles'
import { useDispatch } from 'Store'
import { pipe } from 'fp-ts/lib/pipeable'
import { parseSpotifyUrl } from 'Modules/parse-spotify-url'
import { fold } from 'fp-ts/lib/Option'
import { loadSearchInputSpotifyArtistId } from 'Store/app/epics'
import { DirectionRow } from 'Components/styled-common'
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search';

const InputContainer = styled(DirectionRow)`
background-color: hsl(0, 0%, 11%);
color: ${props => props.theme.textMainColor};
border: 2px solid ${props => props.theme.textMainColor};
padding-left: 8px
border-radius: 16px;
font-size: 28px;
width: 90%;
`

const Input = styled.input`
line-height: 24px;
padding: 4px 8px 4px 32px;
color: ${props => props.theme.textMainColor};
border-color: transparent;
width: 100%;
background-color: inherit;
font-size: inherit
`

const SearchButton = styled(SearchIcon)`
cursor: pointer;
width: 5%;
margin: 1% 12px 1% 12px;
color: ${props => props.theme.textMainColor};
`

export const SearchInput: React.FC<{ className?: string }> = ({ className }) => {

  const dispatch = useDispatch()
  const [value, setValue] = useState("spotify:artist:35IWrq7ZFSjxVZyMPyzAbU")

  const handleSearch = () => pipe(
    parseSpotifyUrl(value),
    fold(
      () => { },
      (id) => dispatch(loadSearchInputSpotifyArtistId(id))
    ))

  return (
    <InputContainer className={className}>
      <Input
        value={value}
        placeholder="spotify:artist:35IWrq7ZFSjxVZyMPyzAbU"
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) =>
          e.keyCode == 13 && handleSearch()
        } />
      <SearchButton onClick={handleSearch}>
        {/* <SearchIcon title="Search"/> */}
      </SearchButton>
    </InputContainer>
  )

}