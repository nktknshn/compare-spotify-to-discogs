import { SearchPage } from "app/pages/search";
import { isNone, isSome, none } from "fp-ts/lib/Option";
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
import { FloatingError } from "Components/floating-error";
import { setError } from "Store/app/actions";


const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { accessToken, showOtherResults,
    currentTrack, isLoadingSpotify, artistId, spotifyArtists, error } = useSelector(state => state.app);
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

  // if (isSome(error)) {
  //   return <FloatingError error={error.value} onClose={() => { }} />
  // }

  if (isAuthorizing)
    return <Centered>
      <Spinner size={12} />
      <TextMain>Redirecting to spotify...</TextMain>
    </Centered>;

  if (spotifyArtistsLoaded)
    return (<>
      {isSome(error) && <FloatingError error={error.value} onClose={() => { dispatch(setError(none)) }} />}
      <ComparisonPage />
    </>
    );

  if (noTrackPlaying)
    return (<>
      {isSome(error) && <FloatingError error={error.value} onClose={() => { dispatch(setError(none)) }} />}
      <SearchPage />
    </>
    )

  return <>
    {isSome(error) && <FloatingError error={error.value} onClose={() => { dispatch(setError(none)) }} />}
    <Centered>
      <Spinner size={12} />
      <TextMain>Loading...</TextMain>
    </Centered>
  </>

};

export default App;
