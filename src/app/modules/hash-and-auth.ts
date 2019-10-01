import { fromNullable } from "fp-ts/lib/Option"
import { AUTH_REDIRECT_URL } from "./config"

export const redirectToAuth = () => document.location.href = `https://accounts.spotify.com/authorize?client_id=30938a18895e4602bc2626afe9c60f3a&response_type=token&redirect_uri=${AUTH_REDIRECT_URL}&token_type=Bearer&scope=user-read-currently-playing%20user-read-playback-state&expires_in=10000`

export const resetHash = () => { document.location.hash = "" }

export const parseTokenFromHash = () => fromNullable(document.location.hash.split("access_token=")[1])