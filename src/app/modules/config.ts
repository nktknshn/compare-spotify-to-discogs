declare var DEVMODE: boolean;

export const AUTH_REDIRECT_URL = DEVMODE ? "http://hotmeal:8080/" : "https://kanash.in/spotify/"
export const MAX_DISCOGS_RESULTS = 30
export const HIDDEN_DISCOGS_ROLES = ['Producer', 'Remix', 'Appearance', 'Mixed by', 'UnofficialRelease']
export const DISCOGS_RELEASES_TO_LOAD = 200 
export const MAX_SPOTIFY_STYLEs_TO_SHOW = 5
export const DISCOGS_AUTH = {
  key: 'syzIblXlSiWarnhpkhRR',
  secret: 'oKTlchSekUSCLQzVFQdHrXGcCMsFMyRb'
}
export const SEARCH_INPUT_PLACEHOLDER = "Artist link or Spotify URI"
export const SEARCH_INPUT_INITIAL_VALUE = DEVMODE ? "https://open.spotify.com/artist/05lIUgmmsmTX2N9dCKc8rC?si=9e00lpukRS2kaFRZH9iQ1g" : ""
