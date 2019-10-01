import React from 'react'
import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<StyledTheme>;

interface StyledTheme {
  backgroundColor: string,
  textMainColor: string,
  textSecondaryColor: string,
  controlsDivBackgroundColor: string,
  yearWidth: number
}

const mainTheme: StyledTheme = {
  backgroundColor: "#282828",
  textMainColor: "hsla(0, 100%, 100%, .66)",
  textSecondaryColor : "hsla(0, 100%, 100%, .33)",
  controlsDivBackgroundColor: "hsl(0, 0%, 20%)",
  yearWidth: 20
}


const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.backgroundColor}
  }
`


const ThemeProvider: React.FC = (props) => {
  return <styledComponents.ThemeProvider theme={mainTheme}>
    <>
      <GlobalStyle />
      {props.children}
    </>
  </styledComponents.ThemeProvider>
}

export { ThemeProvider, mainTheme, css, keyframes }

export default styled;