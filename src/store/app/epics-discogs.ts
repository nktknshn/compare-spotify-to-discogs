import { DISCOGS_RELEASES_TO_LOAD } from "app/modules/config";
import { discogs } from "discogs";
import { last } from "fp-ts/lib/Array";
// import { MasterReleaseResponse, ReleaseResponse, ReleasesEntity } from "discogs/_types";
import * as E from "fp-ts/lib/Either";
import { isSome, Option, some, fromNullable } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { ThunkAC } from "Store";
import { isReleaseExpanded } from "Store/selectors";
import * as Discogs from 'typescript-discogs-client';
import { Master, Release, DiscogsError } from "typescript-discogs-client";
import {
  addDiscogsReleaseTracks, removeDiscogsReleaseTracks, setDiscogsGenres,
  // setDiscogsArtist,
  setDiscogsReleases, setDiscogsSearchResults, setError, setLoadingDiscogs
} from "./actions";
import { AppError } from "./types";

const toAppError = (error: DiscogsError): AppError => ({
  name: "Discogs error",
  message: error.message,
  code: fromNullable(error.code)
})

export const toggleDiscogsReleaseTracks = (release: Discogs.ArtistRelease | Discogs.ArtistMaster):
  ThunkAC<Promise<void>> =>
  async (dispatch, getState) => {
    const { map, fold } = E

    dispatch(setLoadingDiscogs(true))

    if (isReleaseExpanded(release.id)(getState())) {
      dispatch(removeDiscogsReleaseTracks(release.id));
    } else {

      try {
        const res: Release | Master =
          (release.type === 'release')
            ? await discogs.getRelease(release.id)
            : await discogs.getMaster(release.id)

        dispatch(addDiscogsReleaseTracks(release.id, res.tracklist))

      } catch (error) {
        if(error instanceof DiscogsError)
          dispatch(setError(some(toAppError(error))))
      }

    }
    dispatch(setLoadingDiscogs(false))
  }

export const loadDiscogsReleases = (): ThunkAC<Promise<void>> => async (
  dispatch,
  getState
) => {
  const {
    selectedDiscogsIdx,
    discogsSearchResults,
  } = getState().app;

  const { map, fold } = E

  if (isSome(selectedDiscogsIdx) && isSome(discogsSearchResults)) {
    dispatch(setLoadingDiscogs(true))

    try {
      const { releases } =
        await discogs.getArtistReleases(discogsSearchResults.value[selectedDiscogsIdx.value].id,
          { sort: "year", per_page: DISCOGS_RELEASES_TO_LOAD })

      dispatch(setDiscogsReleases(releases))
    }
    catch (error) {
      dispatch(setError(some(error)))
    }
    dispatch(setLoadingDiscogs(false))
  }
};


export const loadSearchDiscogsWithCurrentArtist = (): ThunkAC<
  Promise<void>
> => async (dispatch, getState) => {
  const { spotifyArtists, selectedSpotifyIdx } = getState().app;

  if (spotifyArtists.length > 0 && isSome(selectedSpotifyIdx)) {

    dispatch(setLoadingDiscogs(true))

    try {
      const { results } = await discogs.search({
        query: spotifyArtists[selectedSpotifyIdx.value].name,
        type: "artist"
      })

      dispatch(setDiscogsSearchResults(some(results)))

    } catch (error) {
      dispatch(setError(some(error)))
    }

    dispatch(setLoadingDiscogs(false))
  }
};


export const loadDiscogsGenres = (): ThunkAC<Promise<void>> => async (dispatch, getState) => {

  const { discogsReleases } = getState().app

  if (discogsReleases.length == 0)
    return

  dispatch(setLoadingDiscogs(true))

  const lastMain: Option<Discogs.ArtistRelease | Discogs.ArtistMaster> = pipe(
    discogsReleases.filter(_ => _.role == 'Main'),
    last
  )

  if (isSome(lastMain)) {
    const last = lastMain.value

    try {
      const release: Release | Master = (last.type == 'release')
        ? await discogs.getRelease(last.id)
        : await discogs.getMaster(last.id)

      dispatch(setDiscogsGenres(release.styles || release.genres || []))
    } catch (error) {
      dispatch(setError(some(error)))
    }


  }
  dispatch(setLoadingDiscogs(false))

}