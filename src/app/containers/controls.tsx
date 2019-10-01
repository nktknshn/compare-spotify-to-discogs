import React from 'react'
import { useDispatch, useSelector } from 'Store'
import { TextMain, Spacer, GitHubLogoDiv } from 'Components/styled-common'
import { toggleShowSingles, toggleShowTrackAppearances, toggleShowCompilations } from 'Store/app/actions'
import styled from 'Styles'

const CheckboxLabel = styled(TextMain)`
cursor: pointer
`

export const Controls: React.FunctionComponent = () => {

  const { showCompilations, showSingles, showTrackAppearances } = useSelector(s => s.app)
  const dispatch = useDispatch()

  return (
    <>
      <div onClick={() => { dispatch(toggleShowSingles()) }}>
        <input
          checked={showSingles}
          type="checkbox"
        />
        <CheckboxLabel>Show singles</CheckboxLabel>
        <br />
      </div>

      <div onClick={() => { dispatch(toggleShowCompilations()) }}>
        <input
          checked={showCompilations}
          type="checkbox"
        />
        <CheckboxLabel>Show compilations</CheckboxLabel>
        <br />
      </div>

      <div onClick={() => { dispatch(toggleShowTrackAppearances()) }}>
        <input
          checked={showTrackAppearances}
          type="checkbox"
        />
        <CheckboxLabel>Show track appearances</CheckboxLabel>
      </div>

      <Spacer height={"50px"} />
      <GitHubLogoDiv></GitHubLogoDiv>
    </>
  )
}