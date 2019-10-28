import React, { useRef } from 'react'
import { useOutsideClick } from 'app/hooks/use-outside-click'
import { Overlay, TextMain, Centered, DirectionColumns, TextSecondary } from './styled-common'
import styled from 'Styles'
import { AppError } from 'Store/app/types'
import { isSome } from 'fp-ts/lib/Option'

const Window = styled.div`
background-color: ${props => props.theme.searchInputBackground};
margin: 128px auto;
/* height: 200px; */
width: 300px;
border-radius: 16px;
border: 2px solid ${props => props.theme.textMainColor};
padding: 4px 16px 4px 16px;
`

export const FloatingError: React.FC<{ onClose: () => void, error: AppError }> = ({ onClose, error }) => {

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose)

  return (
    <Overlay>
      <Window ref={ref}>
        <TextMain>
          {/* <p>Error</p> */}
          {isSome(error.code) && <p><TextSecondary>{error.code.value}</TextSecondary></p>}
          <p>{error.name}</p>
          <p>{error.message}</p>
        </TextMain>
      </Window>
    </Overlay>
  )
}