import { Option, none, some } from "fp-ts/lib/Option"

export const parseSpotifyUrl = (url: string): Option<string> => {
  const id = url.substr(15, 24)
  return id.length > 0 ? some(id): none
}