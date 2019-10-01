import styled from 'app/styled'


// export const bgMainColor = "background-color: #282828"
// export const textMainColor = "hsla(0, 100%, 100%, .66)"
export const YearWidth = 20

export const TextMain = styled.span`
color: ${({ theme }) => theme.textMainColor};
`

export const TextSecondary = styled(TextMain)`
color: ${props => props.theme.textSecondaryColor};
font-size: smaller
`

export const DirectionColumns = styled.div`
display: flex;
flex-direction: column;
`
export const DirectionRow = styled.div`
display: flex;
flex-direction: row;
`

export const Title = styled.div`
// color: hsla(0, 100%, 100%, .66);
`

export const Spacer = styled.div<{ height: string }>`
height: ${(props) => props.height}
`

export const TrackLink = styled.a<{ current?: boolean }>`
color: hsla(0, 100%, 100%, .66);
text-decoration: none;
font-weight: ${(props) => props.current ? 'bold' : 'normal'}
`

export const GitHubLogoDiv = styled.div`
background: url("https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png")
width: 30px
`

export const GitHubLogo = styled.img`
max-width: 80%;
max-height: 80%;
`

