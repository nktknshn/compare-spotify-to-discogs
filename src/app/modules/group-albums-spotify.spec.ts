import { groupByYear, expandAlbums } from "./group-albums-spotify"
import albumsdata from '../../testdata/albums.json'
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray"

describe('albumsByYearSpotify', () => {
    test('albumsByYearSpotify', () => {
        expect(Object.keys(groupByYear(albumsdata.albums)))
            .toEqual(['2011', '2012', '2013', '2014', '2016', '2017'])
    })

    test('expanded', () => {
        const expanded = expandAlbums(
            ['5HooDwnvWuIRapdSM0lE77'])(albumsdata.albums as NonEmptyArray<any>)

        expect(expanded[0].type).toBe('album')
        expect(expanded[1].type).toBe('track')
        expect(expanded[2].type).toBe('track')

    })
})