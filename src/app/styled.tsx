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
  tableBorderColor: string,
  yearWidth: number,
  tableHeaderColor: string,
  tableHeaderColor2: string,

}

const mainTheme: StyledTheme = {
  backgroundColor: "#282828",
  textMainColor: "hsla(0, 100%, 100%, .66)",
  textSecondaryColor : "hsla(0, 100%, 100%, .33)",
  controlsDivBackgroundColor: "hsl(0, 0%, 20%)",
  tableBorderColor: "hsla(0, 100%, 100%, .06)",
  tableHeaderColor: "#202020",
  tableHeaderColor2: "#282828",
  // tableHeaderColor2: "hsl(0, 0%, 8%)",
  yearWidth: 20
}


const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.backgroundColor}
    overflow-y: hidden
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