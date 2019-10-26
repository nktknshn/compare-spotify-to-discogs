import { Option, none, some, fromNullable, chain } from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import { lookup } from "fp-ts/lib/Array"

// https://open.spotify.com/artist/1YPkdEe6cWHDZpaCZ2gHh7?si=s9qtwuPpRXiS8B5QAFQbIg
// spotify:artist:1YPkdEe6cWHDZpaCZ2gHh7

export const parseSpotifyUrl = (url: string): Option<string> => {

  if (url.startsWith("spotify:artist:")) {
    const id = url.substr(15, 24)
    return id.length > 0 ? some(id) : none
  } else if(url.startsWith("https://open.spotify.com/artist/")) {
    const re = /spotify\.com\/artist\/([a-zA-Z0-9]+)\??/
    const matches = re.exec(url)
    return pipe(
      fromNullable(matches),
      chain(matches => lookup(1, matches))
    )
  } else {
    return none
  }
}