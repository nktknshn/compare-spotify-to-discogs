import styled, { keyframes } from 'app/styled'


// export const bgMainColor = "background-color: #282828"
// export const textMainColor = "hsla(0, 100%, 100%, .66)"
export const YearWidth = 20

export const TextMain = styled.span`
color: ${({ theme }) => theme.textMainColor};
`

export const TextSecondary = styled.span`
color: ${props => props.theme.textSecondaryColor};
font-size: smaller;
font-weight: normal;
`

export const DirectionColumns = styled.div`
display: flex;
flex-direction: column;
`
export const DirectionRow = styled.div`
display: flex;
flex-direction: row;
//justify-content: flex-end;
`

export const VerticalSpacer = styled.div<{ height: string }>`
height: ${(props) => props.height};
`

export const TrackLink = styled.a<{ current?: boolean }>`
color: hsla(0, 100%, 100%, .66);
text-decoration: none;
font-weight: ${(props) => props.current ? 'bold' : 'normal'};
`

export const GitHubLogoDiv = styled.div`
background: url("https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png");
width: 30px;
`

export const GitHubLogo = styled.img`
max-width: 80%;
max-height: 80%;
`

export const Centered = styled(DirectionRow)`
margin: 0 auto;
width: 200px; 
`

export const HorizontalSpacer = styled.div`
width: auto;
`

export const popupAnimation = keyframes`
0%{
  transform: scale(0.3);
}
100%{
  transform: scale(1);
}
`

export const Overlay = styled.div`
position: fixed;
background-color: ${props => props.theme.overlayBackgroundColor};
z-index: 2;
top: 0;
left: 0;
width: 100%;
height: 100%;
/* opacity: 0.9; */
// animation: ${popupAnimation} 0.1s;
`