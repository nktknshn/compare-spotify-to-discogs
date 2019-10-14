import React from 'react'
import { useDispatch, useSelector } from 'Store'
import { TextMain, VerticalSpacer, GitHubLogoDiv } from 'Components/styled-common'
import { toggleShowSingles, toggleShowTrackAppearances, toggleShowCompilations, toggleShowMainReleases } from 'Store/app/actions'
import styled from 'Styles'

const CheckboxLabel = styled(TextMain)`
cursor: pointer;
`

export const Controls: React.FunctionComponent = () => {

  const { showCompilations, showSingles, showTrackAppearances, showMainReleases } = useSelector(s => s.app)
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

      <div onClick={() => { dispatch(toggleShowMainReleases()) }}>
        <input
          checked={showMainReleases}
          type="checkbox"
        />
        <CheckboxLabel>Show main releases</CheckboxLabel>
      </div>

      <VerticalSpacer height={"50px"} />
      <GitHubLogoDiv></GitHubLogoDiv>
    </>
  )
}