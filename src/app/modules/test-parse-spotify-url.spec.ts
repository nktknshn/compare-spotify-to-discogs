import { parseSpotifyUrl } from "./parse-spotify-url"
import { isSome, some, none } from "fp-ts/lib/Option"

describe('parseSpotifyUrl should', () => {
    test('parse artist link 1', () => {      
      const result = parseSpotifyUrl("https://open.spotify.com/artist/1YPkdEe6cWHDZpaCZ2gHh7?si=TgxlxXSAT9OGN07_0ALo9Q")
      expect(result).toStrictEqual(some("1YPkdEe6cWHDZpaCZ2gHh7"))
    })
    
    test('parse artist link 2', () => {      
      const result = parseSpotifyUrl("https://open.spotify.com/artist/1YPkdEe6cWHDZpaCZ2gHh7")
      expect(result).toStrictEqual(some("1YPkdEe6cWHDZpaCZ2gHh7"))
    })

    test('parse spotify uri', () => {      
      const result = parseSpotifyUrl("spotify:artist:1YPkdEe6cWHDZpaCZ2gHh7")
      expect(result).toStrictEqual(some("1YPkdEe6cWHDZpaCZ2gHh7"))
    })

    test('return none', () => {      
      const result = parseSpotifyUrl("invalid uri")
      expect(result).toStrictEqual(none)
    })
})