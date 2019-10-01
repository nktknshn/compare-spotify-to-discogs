import releasesdata from "../../testdata/releases.json";
import { expandReleases } from "./group-discogs-albums";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

describe("test group-discogs-albums", () => {
  test("expand none", () => {
    const expanded = expandReleases({})(releasesdata.releases as NonEmptyArray<
      any
    >);

    expect(expanded).toEqual(releasesdata.releases);
  });

  test("expand", () => {
    const expanded = expandReleases({})(releasesdata.releases as NonEmptyArray<
      any
    >);

    expect(expanded).toEqual(releasesdata.releases);
  });
});
