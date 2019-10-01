import { SearchPage } from "app/pages/search";
import { isNone, isSome } from "fp-ts/lib/Option";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "Store";
import { onLoad, setAccessTokenEpic } from "Store/app/epics";
import { isLoadingComplete } from "Store/selectors";
import Spinner from './components/spinner';
import { TextMain, DirectionRow } from "./components/styled-common";
import { parseTokenFromHash, redirectToAuth, resetHash } from "./modules/hash-and-auth";
import { ComparisonPage } from "./pages/comparison";
import styled from "Styles";

const Centered = styled(DirectionRow)`
margin: 0 auto;
width: 200px; 
`

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { accessToken, showOtherResults,
    currentTrack, isLoadingSpotify, artistId, spotifyArtists } = useSelector(state => state.app);
  const spotifyArtistsLoaded = useSelector(isLoadingComplete);

  // const [_accessToken, setAccessToken] = useState<Option<string>>(none)

  const isAuthorizing = isNone(accessToken) && isLoadingSpotify
  const noTrackPlaying = isNone(currentTrack) && isSome(accessToken) && !isLoadingSpotify

  useEffect(() => {
    const token = parseTokenFromHash();

    if (isSome(token)) {
      resetHash();
      dispatch(setAccessTokenEpic(token));
      dispatch(onLoad());
    } else if (isNone(accessToken))
      redirectToAuth();
  });

  if (isAuthorizing)
    return <Centered>
      <Spinner />
      <TextMain>Authorizing...</TextMain>
    </Centered>;


  if (noTrackPlaying)
    return (
      <SearchPage />
    )

  if (spotifyArtistsLoaded)
    return (<>
      <ComparisonPage />
    </>
    );

  return <Centered>
    <Spinner />
    <TextMain>Loading current track...</TextMain>
  </Centered>;
};

export default App;
