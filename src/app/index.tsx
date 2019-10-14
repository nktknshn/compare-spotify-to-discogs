import { SearchPage } from "app/pages/search";
import { isNone, isSome } from "fp-ts/lib/Option";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "Store";
import { onMainPageLoad } from "Store/app/epics";
import { isLoadingComplete } from "Store/selectors";
import Spinner from './components/spinner';
import { TextMain, DirectionRow, Centered } from "./components/styled-common";
import { parseTokenFromHash, redirectToAuth, resetHash } from "./modules/hash-and-auth";
import { ComparisonPage } from "./pages/comparison";
import styled from "Styles";
import { setAccessTokenEpic } from "Store/app/epics-token";



const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { accessToken, showOtherResults,
    currentTrack, isLoadingSpotify, artistId, spotifyArtists } = useSelector(state => state.app);
  const spotifyArtistsLoaded = useSelector(isLoadingComplete);

  const isAuthorizing = isNone(accessToken) && isLoadingSpotify
  const noTrackPlaying = isSome(accessToken) && isNone(currentTrack) && !isLoadingSpotify

  useEffect(() => {
    const token = parseTokenFromHash();

    if (isSome(token)) {
      resetHash();
      dispatch(setAccessTokenEpic(token));
      dispatch(onMainPageLoad());
    } else if (isNone(accessToken))
      redirectToAuth();
  });

  if (isAuthorizing)
    return <Centered>
      <Spinner />
      <TextMain>Redirecting to spotify...</TextMain>
    </Centered>;

  if (spotifyArtistsLoaded)
    return (<>
      <ComparisonPage />
    </>
    );

  if (noTrackPlaying)
    return (
      <SearchPage />
    )

  return <Centered>
    <Spinner />
    <TextMain>Loading...</TextMain>
  </Centered>;
};

export default App;
