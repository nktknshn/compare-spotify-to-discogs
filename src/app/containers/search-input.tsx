import { DirectionRow } from 'Components/styled-common'
import { fold, some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { parseSpotifyUrl } from 'Modules/parse-spotify-url'
import React, { useState } from 'react'
import { useDispatch } from 'Store'
import { searchSpotify } from 'Store/app/epics'
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search'
import styled from 'Styles'
import { SEARCH_INPUT_PLACEHOLDER, SEARCH_INPUT_INITIAL_VALUE } from 'Modules/config'
import { setError } from 'Store/app/actions'

const InputContainer = styled(DirectionRow)`
background-color: ${props => props.theme.searchInputBackground};
color: ${props => props.theme.textMainColor};
border: 2px solid ${props => props.theme.textMainColor};
padding-left: 8px;
border-radius: 16px;
font-size: ${props => props.theme.searchInputFontSizeMain};
width: 90%;
`

const Input = styled.input`
line-height: 24px;
padding: 4px 8px 4px 32px;
color: ${props => props.theme.textMainColor};
border-color: transparent;
width: 100%;
background-color: inherit;
font-size: inherit;
`

const SearchButton = styled(SearchIcon)`
cursor: pointer;
width: 5%;
margin: 1% 12px 1% 12px;
color: ${props => props.theme.textMainColor};
`

export const SearchInput: React.FC<{ className?: string }> = ({ className }) => {

  const dispatch = useDispatch()
  const [value, setValue] = useState(SEARCH_INPUT_INITIAL_VALUE)

  const handleSearch = () => pipe(
    parseSpotifyUrl(value),
    fold(
      () => {
        dispatch(setError(some({
          code: -1,
          name: "Invalid input",
          message: "Must be a link or a Spotify URI"
        })))
      },
      (id) => { dispatch(searchSpotify(id)) }
    ))

  return (
    <InputContainer className={className}>
      <Input
        value={value}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
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