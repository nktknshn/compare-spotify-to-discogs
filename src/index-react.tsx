// import React from "react";
// import { render } from "react-dom";
// import styled from "styled-components";
// import SpotifyApi from "spotify-web-api-node";
// import { EitherAsync } from "purify-ts//EitherAsync";
// import {
//     IdentifyDiscogs,
//     Discogs,
//     DiscogsTypes
// } from "typescript-music-services-library";
// import _ from "lodash";
// import Debug from "debug";

// const debug = Debug("index-react");
// Debug.enable("index-react");

// const bgMainColor = "background-color: #282828";
// const YearWidth = 20;

// const Text = styled.span`
//     color: hsla(0, 100%, 100%, 0.66);
// `;

// const TextSecondary = styled(Text)`
//     color: hsla(0, 100%, 100%, 0.33);
//     font-size: smaller;
// `;

// const DirectionColumns = styled.div`
//     display: flex;
//     flex-direction: column;
// `;
// const DirectionRow = styled.div`
//     display: flex;
//     flex-direction: row;
// `;

// const ControlsDiv = styled(DirectionColumns)`
// margin-left: 8px
// font-size: small
// position: sticky
// top: 0
// `;

// const TableHeader = styled.th`
// // ${bgMainColor}
// `;

// const HeaderArtists = styled.th`
//     padding-bottom: 4px;
// `;

// const HeaderCaption = styled.th`
//     position: sticky;
//     top: 0;
//     background-color: hsl(0, 0%, 8%);
// `;

// const MainContainer = styled(DirectionRow)`
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     // margin-top: 32px
//     ${bgMainColor}
// `;

// const HeaderRowCaption = styled.tr`
//     color: hsla(0, 100%, 100%, 0.66);
// `;

// const HeaderRowArtists = styled.tr`
//     color: hsla(0, 100%, 100%, 0.66);
//     padding: 4px;
//     text-align: left ${bgMainColor};
// `;

// const Table = styled.table`
// // height: 40vh;
// overflow-y: scroll
// position: relative;
// overflow-wrap:  anywhere;
// `;

// const TableDiv = styled.div`
//     background-color: hsl(0, 0%, 11%);
//     margin: 0 auto;
//     border-radius: 3px;

//     height: 95vh;
//     overflow-y: auto ${bgMainColor};
// `;

// const Title = styled.div`
//     color: hsla(0, 100%, 100%, 0.66);
// `;

// const Row = styled.tr`
//     color: hsla(0, 100%, 100%, 0.66);
//     border-bottom: 1pt solid black;
// `;

// const RowYear = styled.tr`
// color: hsla(0, 100%, 100%, .66);
// font-size: smaller
// text-align: right
// border-bottom:1pt solid black;
// `;

// const Spacer = styled.div<{ height: string }>`
//     height: ${props => props.height};
// `;

// const CellYear = styled.td`
// padding-left: 4px
// padding-right: 8px
// width: ${YearWidth}
// font-size: smaller
// // ${bgMainColor}
// `;

// const CellPlaying = styled.td`
// text-align: left
// padding-right: 8px
// font-size: smaller
// // ${bgMainColor}
// `;

// const YaerHead = styled(TableHeader)`
//     background-color: hsl(0, 0%, 8%);
// `;

// const Link = styled.a`
//     color: hsla(0, 100%, 100%, 0.66);
//     text-decoration: none;
//     font-weight: ${(props: { current: boolean }) =>
//         props.current ? "bold" : "normal"};
// `;

// const SwitchArtistLink = styled.a`
//     color: hsla(0, 100%, 100%, 0.66);
//     font-weight: ${(props: { current: boolean }) =>
//         props.current ? "bold" : "normal"};
// `;

// const OthersLink = styled.a`
//     text-decoration: underline;
//     color: hsla(0, 100%, 100%, 0.66);
//     text-decoration-color: hsla(0, 100%, 100%, 0.66);
//     font-weight: normal;
// `;

// const SpotifyCell = styled.td`
// min-width: 40vw
// text-align: right
// `;

// const DiscogsCell = styled.td`
//     min-width: 40vw;
// `;

// const GitHubLogoDiv = styled.div`
// background: url("https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png")
// width: 30px
// `;

// const GitHubLogo = styled.img`
//     max-width: 80%;
//     max-height: 80%;
// `;

// const OtherResultsDiv = styled.div`
// position: absolute
// top: 0
// left: 60vw
// background-color: hsl(0, 0%, 4%);
// padding: 8px
// `;

// const OtherResultsList = styled.ul`
// margin-left: 0;
// list-style: none
// list-style-type: none
// `;

// const nextDiscogs = new Discogs.NextClient(
//     "IzSqDBseMpKBZIzWcNxKICEcIRfuhMluLedYuCpT"
// );
// const discogs = new Discogs.Client("IzSqDBseMpKBZIzWcNxKICEcIRfuhMluLedYuCpT");

// function eitherAsync<L = any, R = any>(p: Promise<R>) {
//     return EitherAsync<L, R>(() => p).run();
// }

// type Filter<T, R> = T extends R ? never : T;
// type Defined<T> = Filter<T, undefined>;
// const extractYear = (s: string) => Number.parseInt(s.split("-")[0]);

// const TableRow = ({
//     spotify,
//     discogs,
//     currentTrack,
//     onSpotifyAlbumClicked,
//     onDiscogsReleaseClicked
// }: {
//     spotify?: SpotifyApi.TrackObjectSimplified | SpotifyApi.AlbumObjectFull;
//     currentTrack: Defined<App["state"]["currentTrack"]>;
//     onSpotifyAlbumClicked: App["handleSpotifyAlbumClicked"];
//     onDiscogsReleaseClicked: App["handleDiscogsReleaseClicked"];
//     discogs?: DiscogsTypes.ReleasesEntity | DiscogsTypes.TracklistEntity;
// }) => (
//     <Row key={spotify && spotify.id}>
//         {/* Spotify */}
//         {!spotify && <SpotifyCell />}

//         {spotify && spotify.type == "album" && (
//             <SpotifyCell>
//                 <Link
//                     current={currentTrack.album.id == spotify.id}
//                     href={spotify.external_urls["spotify"]}
//                 >
//                     <TextSecondary>{spotify.album_type}</TextSecondary>
//                 </Link>
//                 &nbsp;
//                 <Link
//                     current={currentTrack.album.id == spotify.id}
//                     href="#"
//                     onClick={() => onSpotifyAlbumClicked(spotify)}
//                 >
//                     {spotify.name}
//                 </Link>
//             </SpotifyCell>
//         )}

//         {spotify && spotify.type == "track" && (
//             <SpotifyCell>
//                 <TextSecondary>
//                     {spotify.name} - {spotify.track_number}
//                 </TextSecondary>
//             </SpotifyCell>
//         )}

//         {/* middle column  */}
//         <CellPlaying>
//             <b>
//                 {spotify &&
//                     spotify.type == "album" &&
//                     currentTrack.album.id == spotify.id && <Text>▶</Text>}
//             </b>
//             {spotify &&
//                 spotify.type == "track" &&
//                 currentTrack.id == spotify.id && (
//                     <TextSecondary>▶</TextSecondary>
//                 )}
//         </CellPlaying>

//         {/* discogs */}
//         {!discogs && <DiscogsCell />}

//         {discogs && ("status" in discogs || "main_release" in discogs) && (
//             <DiscogsCell>
//                 <Link
//                     current={false}
//                     href="#"
//                     onClick={() => onDiscogsReleaseClicked(discogs)}
//                 >
//                     {discogs.title}
//                 </Link>
//                 &nbsp;
//                 <Link
//                     current={false}
//                     href={
//                         "https://discogs.com/" + discogs.type + "/" + discogs.id
//                     }
//                 >
//                     <TextSecondary>{discogs.role}</TextSecondary>
//                 </Link>
//             </DiscogsCell>
//         )}

//         {discogs && "duration" in discogs && (
//             <DiscogsCell>
//                 <TextSecondary>
//                     {discogs.position} - {discogs.title}
//                 </TextSecondary>
//             </DiscogsCell>
//         )}
//     </Row>
// );

// const RenderByYear: React.FunctionComponent<{
//     spotifyAlbums: Defined<App["state"]["spotifyAlbums"]>;
//     discogsReleases: Defined<App["state"]["discogsReleases"]>;
//     spotifyTracks: string[];
//     showSingle: boolean;
//     discogsTracks: Defined<App["state"]["discogsTracks"]>;
//     showCompilations: boolean;
//     showTrackAppearance: boolean;
//     year: number;
//     currentTrack: Defined<App["state"]["currentTrack"]>;
//     onSpotifyAlbumClicked: App["handleSpotifyAlbumClicked"];
//     onDiscogsReleaseClicked: App["handleDiscogsReleaseClicked"];
// }> = ({
//     spotifyAlbums,
//     discogsReleases,
//     spotifyTracks,
//     showSingle,
//     showCompilations,
//     showTrackAppearance,
//     year,
//     onSpotifyAlbumClicked,
//     onDiscogsReleaseClicked,
//     currentTrack,
//     discogsTracks
// }) => {
//     const albumsByYearSpotify = _.chain(spotifyAlbums)
//         // .sortBy(_ => _.release_date)
//         // .reverse()
//         .uniqBy(_ => _.name.toLowerCase())
//         .filter(_ => showSingle || _.album_type != "single")
//         .filter(_ => showCompilations || _.album_type != "compilation")
//         .groupBy(_ => extractYear(_.release_date))
//         .value();

//     const albumsByYearDiscogs = _.groupBy(
//         discogsReleases.filter(
//             _ => showTrackAppearance || _.role != "TrackAppearance"
//         ),
//         _ => _.year
//     );

//     const s = _.chain(
//         albumsByYearSpotify[year] ? albumsByYearSpotify[year] : []
//     )
//         .orderBy(_ => _.name)
//         .map(album =>
//             spotifyTracks.find(_ => _ == album.id)
//                 ? [album, ...album.tracks.items]
//                 : [album]
//         )
//         .flatten()
//         .value();

//     const d = _.chain(
//         albumsByYearDiscogs[year] ? albumsByYearDiscogs[year] : []
//     )
//         .orderBy(_ => _.title)
//         .map(release =>
//             _.has(discogsTracks, release.id)
//                 ? [release, ...discogsTracks[release.id]]
//                 : [release]
//         )
//         .flatten()
//         .value();

//     const tableRows = _.zip(s, d);

//     return (
//         <>
//             <RowYear>
//                 <td></td>
//                 <CellYear>{year}</CellYear>
//                 <td></td>
//             </RowYear>
//             {tableRows.map(([spotify, discogs]) => (
//                 // {spotify && spotify.}
//                 <TableRow
//                     key={spotify && spotify.id}
//                     spotify={spotify}
//                     discogs={discogs}
//                     currentTrack={currentTrack}
//                     onSpotifyAlbumClicked={onSpotifyAlbumClicked}
//                     onDiscogsReleaseClicked={onDiscogsReleaseClicked}
//                 />
//             ))}
//         </>
//     );
// };

// class App extends React.Component<
//     {
//         artistId: string;
//     },
//     {
//         currentTrack?: SpotifyApi.TrackObjectFull;
//         spotifyArtists: SpotifyApi.ArtistObjectSimplified[];
//         spotifyAlbums?: SpotifyApi.AlbumObjectFull[];

//         discogsArtist?: DiscogsTypes.SearchResponseEntity;
//         discogsReleases?: DiscogsTypes.ReleasesEntity[];
//         discogsSearchResults: DiscogsTypes.SearchResponseEntity[];

//         accessToken?: string;
//         selectedSpotifyIdx: number;
//         selectedDiscogsIdx: number;
//         isLoading: boolean;

//         showTrackAppearance: boolean;
//         showSingle: boolean;
//         showCompilations: boolean;
//         showOtherResults: boolean;

//         spotifyTracks: string[];
//         discogsTracks: { [releaseId: number]: DiscogsTypes.TracklistEntity[] };
//     }
// > {
//     spotify = new SpotifyApi();

//     constructor(props: any) {
//         super(props);

//         this.state = {
//             spotifyArtists: [],
//             spotifyTracks: [],
//             discogsSearchResults: [],
//             discogsTracks: {},
//             selectedSpotifyIdx: 0,
//             selectedDiscogsIdx: 0,
//             isLoading: true,
//             showTrackAppearance: true,
//             showSingle: true,
//             showCompilations: true,
//             showOtherResults: false
//         };

//         // const a = _.map([1,2,3], x => x + 1)
//         console.log(_.map);
//     }

//     extractTokenFromHash() {
//         const token = document.location.hash.split("access_token=")[1];
//         document.location.hash = "";
//         this.setState({
//             accessToken: token
//         });
//         return token;
//     }

//     redirectAuth() {
//         document.location.href =
//             "https://accounts.spotify.com/authorize?client_id=30938a18895e4602bc2626afe9c60f3a&response_type=token&redirect_uri=http://hotmeal:8080/&token_type=Bearer&scope=user-read-currently-playing%20user-read-playback-state&expires_in=10000";

//         // document.location.href = "https://accounts.spotify.com/authorize?client_id=30938a18895e4602bc2626afe9c60f3a&response_type=token&redirect_uri=https://kanash.in/spotify/&token_type=Bearer&scope=user-read-currently-playing%20user-read-playback-state&expires_in=10000"
//     }

//     stopLoading() {
//         this.setState({ isLoading: false });
//     }

//     async openArtist(idx: number) {
//         const { spotifyArtists } = this.state;
//         const spotify = this.spotify;

//         this.setState({ isLoading: true });

//         const resultAlbums = await eitherAsync(
//             spotify.getArtistAlbums(spotifyArtists[idx].id)
//         );
//         const spotifyAlbums = resultAlbums.unsafeCoerce().body.items;

//         const albumsFullResult = await eitherAsync(
//             spotify.getAlbums(spotifyAlbums.map(_ => _.id))
//         );
//         const albumsFull = albumsFullResult.unsafeCoerce().body.albums;

//         this.setState({ spotifyAlbums: albumsFull });

//         const discogsSearch = await nextDiscogs.search({
//             query: spotifyArtists[idx].name,
//             type: "artist"
//         });

//         const discogsSearchResults = discogsSearch.unsafeCoerce().results;

//         this.setState({
//             discogsSearchResults
//         });

//         await this.selectDiscogsResult(0);

//         this.stopLoading();
//     }

//     async loadCurrentTrack() {
//         const spotify = this.spotify;

//         this.spotify.setAccessToken(this.extractTokenFromHash());

//         const currentResult = await eitherAsync(
//             spotify.getMyCurrentPlayingTrack()
//         );

//         if (currentResult.isLeft()) {
//             const current = currentResult.extract();
//             if (current.statusCode && current.statusCode == 401)
//                 this.redirectAuth();
//         }

//         const current = currentResult.unsafeCoerce();
//         const currentTrack = (current.body && current.body.item) || undefined;

//         this.setState({ currentTrack });

//         if (!currentTrack) return;

//         this.setState({ spotifyArtists: currentTrack.artists });

//         await this.openArtist(0);
//     }

//     async componentWillMount() {
//         await eitherAsync(this.loadCurrentTrack());
//         this.stopLoading();
//     }

//     async selectSpotifyArtist(idx: number) {
//         await this.openArtist(idx);

//         this.setState({
//             selectedSpotifyIdx: idx
//         });
//     }

//     async selectDiscogsResult(idx: number) {
//         const { discogsSearchResults } = this.state;

//         this.setState({ selectedDiscogsIdx: idx });

//         if (discogsSearchResults.length > 0) {
//             this.setState({
//                 discogsArtist: discogsSearchResults[idx]
//             });

//             const releases = await discogs.getArtistReleases(
//                 discogsSearchResults[idx].id
//             );

//             const releasesResults = releases.unsafeCoerce().releases;

//             if (releasesResults) {
//                 this.setState({
//                     discogsReleases: releasesResults.filter(
//                         _ => _.role == "TrackAppearance" || _.role == "Main"
//                     )
//                 });
//             }
//         }
//     }

//     // shouldComponentUpdate() {
//     //   return false
//     // }

//     handleSpotifyAlbumClicked = (album: SpotifyApi.AlbumObjectFull) => {
//         const { spotifyTracks } = this.state;

//         this.setState({
//             spotifyTracks: _.includes(spotifyTracks, album.id)
//                 ? spotifyTracks.filter(_ => _ != album.id)
//                 : [...spotifyTracks, album.id]
//         });
//     };

//     handleDiscogsReleaseClicked = async (
//         release: DiscogsTypes.ReleasesEntity
//     ) => {
//         console.log(release);

//         if (
//             release.id in this.state.discogsTracks &&
//             this.state.discogsTracks[release.id].length > 0
//         )
//             return this.setState({
//                 ...this.state,
//                 discogsTracks: {
//                     ...this.state.discogsTracks,
//                     [release.id]: []
//                 }
//             });

//         if (release.type == "release") {
//             const result = await discogs.getRelease(release.id);

//             result.ifRight(resp =>
//                 this.setState({
//                     ...this.state,
//                     discogsTracks: {
//                         ...this.state.discogsTracks,
//                         [release.id]: resp.tracklist ? resp.tracklist : []
//                     }
//                 })
//             );
//         } else {
//             const result = await discogs.getMasterRelease(release.id);

//             result.ifRight(resp =>
//                 this.setState({
//                     ...this.state,
//                     discogsTracks: {
//                         ...this.state.discogsTracks,
//                         [release.id]: resp.tracklist ? resp.tracklist : []
//                     }
//                 })
//             );
//         }
//     };

//     render() {
//         const {
//             spotifyArtists,
//             spotifyAlbums,
//             discogsArtist,
//             discogsReleases,
//             isLoading,
//             currentTrack,
//             showTrackAppearance,
//             showSingle,
//             showCompilations,
//             selectedSpotifyIdx,
//             discogsSearchResults,
//             selectedDiscogsIdx,
//             showOtherResults,
//             spotifyTracks,
//             discogsTracks
//         } = this.state;

//         if (!this.state.accessToken)
//             return (
//                 <Text>
//                     <h1>Authorization...</h1>
//                 </Text>
//             );

//         if (!isLoading && !currentTrack)
//             return (
//                 <Text>
//                     <h1>No current track</h1>
//                 </Text>
//             );

//         if (isLoading)
//             return (
//                 <Text>
//                     <h1>Loading...</h1>
//                 </Text>
//             );

//         if (!isLoading && currentTrack && spotifyAlbums && discogsReleases) {
//             const years = _.uniq(
//                 spotifyAlbums
//                     .map(_ => extractYear(_.release_date))
//                     .concat(discogsReleases.map(_ => _.year))
//                     .sort()
//             );

//             const ArtistLinks = () => (
//                 <>
//                     {spotifyArtists.map((_, idx) => (
//                         <>
//                             <SwitchArtistLink
//                                 href="#"
//                                 current={selectedSpotifyIdx == idx}
//                                 onClick={() => this.selectSpotifyArtist(idx)}
//                             >
//                                 {_.name}
//                             </SwitchArtistLink>
//                             &nbsp;
//                         </>
//                     ))}
//                 </>
//             );

//             const DiscogsLinks = () => (
//                 <>
//                     <OthersLink
//                         href={
//                             "https://discogs.com/artist/" +
//                             discogsSearchResults[selectedDiscogsIdx].id
//                         }
//                     >
//                         {discogsSearchResults[selectedDiscogsIdx].title}
//                     </OthersLink>
//                     &nbsp;
//                     <OthersLink
//                         href="#"
//                         onClick={() =>
//                             this.setState({
//                                 showOtherResults: !showOtherResults
//                             })
//                         }
//                     >
//                         <TextSecondary>Other results...</TextSecondary>
//                     </OthersLink>
//                 </>
//             );

//             return (
//                 <MainContainer>
//                     {/* <DirectionRow> */}

//                     <TableDiv>
//                         <Table>
//                             <thead>
//                                 <HeaderRowArtists>
//                                     <HeaderArtists>
//                                         <ArtistLinks />
//                                     </HeaderArtists>

//                                     <HeaderArtists />

//                                     <HeaderArtists>
//                                         <DiscogsLinks />
//                                     </HeaderArtists>
//                                 </HeaderRowArtists>

//                                 <HeaderRowCaption>
//                                     <HeaderCaption>Spotify</HeaderCaption>
//                                     <YaerHead></YaerHead>
//                                     <HeaderCaption>Discogs</HeaderCaption>
//                                 </HeaderRowCaption>
//                             </thead>
//                             <tbody>
//                                 {years.map(_ => (
//                                     <RenderByYear
//                                         spotifyAlbums={spotifyAlbums}
//                                         discogsReleases={discogsReleases}
//                                         spotifyTracks={spotifyTracks}
//                                         discogsTracks={discogsTracks}
//                                         showCompilations={showCompilations}
//                                         showSingle={showSingle}
//                                         showTrackAppearance={
//                                             showTrackAppearance
//                                         }
//                                         currentTrack={currentTrack}
//                                         year={_}
//                                         key={_}
//                                         onSpotifyAlbumClicked={
//                                             this.handleSpotifyAlbumClicked
//                                         }
//                                         onDiscogsReleaseClicked={
//                                             this.handleDiscogsReleaseClicked
//                                         }
//                                     />
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </TableDiv>

//                     <ControlsDiv>
//                         <div
//                             onClick={() =>
//                                 this.setState({ showSingle: !showSingle })
//                             }
//                         >
//                             <input
//                                 defaultChecked={showSingle}
//                                 type="checkbox"
//                             />
//                             <Text>Show singles</Text>
//                             <br />
//                         </div>
//                         <div
//                             onClick={() =>
//                                 this.setState({
//                                     showCompilations: !showCompilations
//                                 })
//                             }
//                         >
//                             <input
//                                 defaultChecked={showCompilations}
//                                 type="checkbox"
//                             />
//                             <Text>Show compilations</Text>
//                             <br />
//                         </div>
//                         <div
//                             onClick={() =>
//                                 this.setState({
//                                     showTrackAppearance: !showTrackAppearance
//                                 })
//                             }
//                         >
//                             <input
//                                 defaultChecked={showTrackAppearance}
//                                 type="checkbox"
//                             />
//                             <Text>Show track appearances</Text>
//                         </div>
//                         <Spacer height={"50px"} />
//                         <GitHubLogoDiv></GitHubLogoDiv>
//                     </ControlsDiv>
//                     {/* </DirectionRow> */}
//                     {showOtherResults && (
//                         <OtherResultsDiv>
//                             <DirectionRow>
//                                 <ul>
//                                     {discogsSearchResults
//                                         .slice(0, 30)
//                                         .map((_, idx) => (
//                                             <li>
//                                                 <SwitchArtistLink
//                                                     href="#"
//                                                     current={
//                                                         selectedDiscogsIdx ==
//                                                         idx
//                                                     }
//                                                     onClick={() =>
//                                                         this.selectDiscogsResult(
//                                                             idx
//                                                         )
//                                                     }
//                                                 >
//                                                     {_.title}
//                                                 </SwitchArtistLink>
//                                             </li>
//                                         ))}
//                                 </ul>
//                             </DirectionRow>
//                         </OtherResultsDiv>
//                     )}
//                 </MainContainer>
//             );
//         } else {
//             return (
//                 <Text>
//                     <h1>Some error occurred</h1>
//                 </Text>
//             );
//         }
//     }
// }

// const Root = <App artistId="7gqsi6aBSkRMJoL9psKqMr" />;

// render(Root, document.getElementById("react-container"));
