// import { isUndefined } from "util"
import Axios from "axios";
import { Either } from "fp-ts/lib/Either";
import { tryCatch } from "fp-ts/lib/TaskEither";
import {
  ArtistReleasesResponse,
  ArtistResponse,
  MasterReleaseResponse,
  ReleaseResponse,
  SearchQuery,
  SearchResponse
} from "./types";

function isDefined<T>(value: T | undefined | null): value is T {
  return (value as T) !== undefined && (value as T) !== null;
}

function makeUrlQuery(q: object): string {
  const qq = q as { [key: string]: number | string };
  return Object.keys(qq)
    .filter(k => isDefined(qq[k]))
    .map(k => `${k.toString()}=${encodeURIComponent(qq[k].toString())}`)
    .join("&");
}
export type DiscogsSearchResponse = Either<Error, SearchResponse>;
export type Error = any;

export class Client {
  constructor(public readonly token: string) { }

  search = (q: SearchQuery) =>
    this.query<SearchResponse>("/database/search", q);

  public getArtist(id: number) {
    return this.query<ArtistResponse>(`/artists/${id}`);
  }

  public getArtistReleases(
    id: number,
    opts?: {
      sort?: "year" | "title" | "format"
      page?: number,
      per_page?: number
    }
  ) {
    return this.query<ArtistReleasesResponse>(`/artists/${id}/releases`,
      opts
    );
  }

  public getMasterRelease(id: number) {
    return this.query<MasterReleaseResponse>(`/masters/${id}`);
  }

  public getRelease(id: number) {
    return this.query<ReleaseResponse>(`/releases/${id}`);
  }

  protected query = <T>(url: string, q?: object) =>
    tryCatch<Error, T>(
      () =>
        this.get<T>(q ? `${url}?${makeUrlQuery(q)}` : url + "?").then(
          resp => resp.data
        ),
      (reason: any) => reason as Error
    )();

  private get = <T>(q: string) => {
    return Axios.get<T>(`https://api.discogs.com${q}&token=${this.token}`, {});
  };
}
