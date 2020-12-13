import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from "querystring";

import spotifyService from "../../services/SpotifyService";
import userService from '../../services/UserService';
import songService from '../../services/SongService';
import artistService from '../../services/ArtistService';
import listenerService from '../../services/ListenerService';
import postService from '../../services/PostService';
import reviewService from '../../services/ReviewService';

import SongResults from "./SongResults";
import AlbumResults from "./AlbumResults";
import ReviewResults from "./ReviewResults";
import PostResults from "./PostResults";
import ArtistResults from "./ArtistResults";
import ListenerResults from "./ListenerResults";

class Search extends React.Component {
    state = {query: '', type: 'track', typeInput: ''};

    componentDidMount() {
        const query = queryString.parse(this.props.location.search)["?criteria"];
        const queryType = queryString.parse(this.props.location.search)["type"];
        if (queryType) {
            document.getElementById(queryType).checked=true;
            this.setState(prevState => ({
                ...prevState,
                typeInput: queryType
            }));
        }
        if (query) {
            this.search(query, queryType);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const query = queryString.parse(this.props.location.search)["?criteria"];
        const queryType = queryString.parse(this.props.location.search)["type"];
        console.log(queryType !== prevState.type)
        if (queryType !== prevState.type) {
            if (queryType) document.getElementById(queryType).checked=true;
            this.setState(prevState => ({
                ...prevState,
                type: queryType
            }));
        }
        if (query !== queryString.parse(prevProps.location.search)["?criteria"]) {
            this.search(query, queryType);
        }
    }

    search = (query, queryType) => {

        switch(queryType){
            case "songs":
                this.searchSongs(query);
                break;
            case "albums":
                this.searchAlbums(query);
                break;
            case "artists":
                this.searchArtists(query);
                break;
            case "posts":
                this.searchPosts(query);
                break;
            case "reviews":
                this.searchReviews(query);
                break;
            case "groupeez":
                this.searchGroupeez(query);
                break;
            default:
                break;
        }

    };

    searchSongs = (query) => {
        const queryParams = {
            q: query,
            type: "track",
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                spotifyService.search(queryParams, accessToken).then(response => {
                    let combinedSongs = [];
                    if (response.tracks) {
                        combinedSongs = combinedSongs.concat(response.tracks.items);
                    }
                    songService.querySong(query)
                        .then(songs => {
                            combinedSongs = combinedSongs.concat(songs);
                            console.log('songs: ' + combinedSongs);
                            this.props.setSongs(combinedSongs, query);
                        })
                });
            })
    };

    searchAlbums = (query) => {
        const queryParams = {
            q: query,
            type: "album",
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                spotifyService.search(queryParams, accessToken).then(response => {
                    if (response.albums) {
                        this.props.setAlbums(response.albums.items, query);
                    }
                });
            })
    };

    searchArtists = (query) => {
        const queryParams = {
            q: query,
            type: "artist",
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                spotifyService.search(queryParams, accessToken).then(response => {
                    let combinedArtists = [];
                    if (response.artists) {
                        combinedArtists = combinedArtists.concat(response.artists.items);
                    }
                    artistService.queryArtist(query)
                        .then(artists => {
                            combinedArtists = combinedArtists.concat(artists);
                            console.log('artists: ' + artists);
                            this.props.setArtists(combinedArtists, query);
                        })
                });
            })
    };

    searchPosts = (query) => {
        postService.queryPost(query)
            .then(posts => {
                this.props.setPosts(posts, query);
            })
    }

    searchReviews = (query) => {
        reviewService.queryReview(query)
            .then(reviews => {
                this.props.setReviews(reviews, query);
            })
    }

    searchGroupeez = (query) => {
        listenerService.queryListener(query)
            .then(listeners => {
                this.props.setListeners(listeners, query);
            })
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">
                <div className="m-2">
                    <span>
                        <p className="h3 d-inline">Search Spotify</p>
                        {
                            this.props.location.search !== '' &&
                            <Link to="/search" className="my-auto ml-2">Clear search</Link>
                        }
                    </span>
                    <div className="input-group mt-2">
                        <input className="form-control" placeholder="search for a song..." value={this.state.query}
                               onChange={(e) => this.setState({query: e.target.value})}/>
                        <div className="input-group-append">
                            <Link className="btn btn-primary" to={`/search?${queryString.stringify({criteria: this.state.query, type: this.state.typeInput})}`}>
                                Search
                            </Link>
                        </div>
                    </div>
                    <div className="input-group mt-2">
                        <div className={"row"}>
                            <div className={"form-check ml-3 mr-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"songs"} name={"queryType"} id={"songs"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "songs"}))}/>
                                <label className={"form-check-label"}>Songs</label>
                            </div>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"artists"} name={"queryType"} id={"artists"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "artists"}))}/>
                                <label className={"form-check-label"}>Artists</label>
                            </div>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"groupeez"} name={"queryType"} id={"groupeez"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "groupeez"}))}/>
                                <label className={"form-check-label"}>Groupeez</label>
                            </div>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"posts"} name={"queryType"} id={"posts"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "posts"}))}/>
                                <label className={"form-check-label"}>Posts</label>
                            </div>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"reviews"} name={"queryType"} id={"reviews"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "reviews"}))}/>
                                <label className={"form-check-label"}>Reviews</label>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.type === "songs" &&
                        <SongResults songs={this.props.songs}/>
                    }
                    {
                        this.state.type === "albums" &&
                        <AlbumResults albums={this.props.albums}/>
                    }
                    {
                        this.state.type === "artists" &&
                        <ArtistResults artists={this.props.artists}/>
                    }
                    {
                        this.state.type === "groupeez" &&
                        <ListenerResults listeners={this.props.listeners}/>
                    }
                    {
                        this.state.type === "posts" &&
                        <PostResults posts={this.props.posts}/>
                    }
                    {
                        this.state.type === "reviews" &&
                        <ReviewResults reviews={this.props.reviews}/>
                    }
                </div>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    songs: state.spotifyReducer.songs,
    albums: state.spotifyReducer.albums,
    artists: state.spotifyReducer.artists,
    listeners: state.spotifyReducer.listeners,
    posts: state.spotifyReducer.posts,
    reviews: state.spotifyReducer.reviews,
    searchQuery: state.spotifyReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setSongs: (songs, query) => dispatch({type: 'SEARCH_SONGS', songs, query}),
    setAlbums: (albums, query) => dispatch({type: 'SEARCH_ALBUMS', albums, query}),
    setArtists: (artists, query) => dispatch({type: 'SEARCH_ARTISTS', artists, query}),
    setPosts: (posts, query) => dispatch({type: 'SEARCH_POSTS', posts, query}),
    setReviews: (reviews, query) => dispatch({type: 'SEARCH_REVIEWS', reviews, query}),
    setListeners: (listeners, query) => dispatch({type: 'SEARCH_LISTENERS', listeners, query})
});

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;