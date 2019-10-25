import { Option, isSome } from "fp-ts/lib/Option";
import { ThunkAC } from "Store";
import { setAccessToken } from "./actions";
import { spotify } from "../../spotify";

export const setAccessTokenEpic = (
  accessToken: Option<string>
): ThunkAC => dispatch => {
  dispatch(setAccessToken(accessToken));

  spotify.setAccessToken(
    isSome(accessToken) ? accessToken.value : ""
  );
};