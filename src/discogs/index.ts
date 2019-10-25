import * as Discogs from 'typescript-discogs-client'
import { DISCOGS_AUTH } from 'Modules/config'

export const discogs = new Discogs.Client({
  auth: DISCOGS_AUTH
})
