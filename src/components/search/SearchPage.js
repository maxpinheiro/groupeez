import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {search} from "../../services/SpotifyService";
import queryString from "querystring";

import userService from '../../services/UserService';
import SongResults from "./SongResults";

class Search extends React.Component {
    state = {query: '', type: 'track'};

    search = (query) => {
        const queryParams = {
            q: query,
            type: this.state.type,
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                search(queryParams, accessToken).then(response => {
                    if (response.tracks) {
                        this.props.setSongs(response.tracks.items, query);
                    }
                });
            })

    };

    componentDidMount() {
        const query = queryString.parse(this.props.location.search)["?criteria"];
        if (query) {
            this.search(query);
        }

        const queryType = queryString.parse(this.props.location.search)["type"];

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const query = queryString.parse(this.props.location.search)["?criteria"];
        if (query !== queryString.parse(prevProps.location.search)["?criteria"]) {
            this.search(query);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline">Search Spotify</p>
                    {this.props.location.search !== '' &&
                    <Link to="/search">Clear search</Link>
                    }
                </span>
                <div className="input-group">
                    <input className="form-control" placeholder="search for a song..." value={this.state.query}
                            onChange={(e) => this.setState({query: e.target.value})}/>
                    <div className="input-group-append">
                        <Link className="btn btn-primary" to={`/search?${queryString.stringify({criteria: this.state.query})}`}>
                            Search
                        </Link>
                    </div>
                    <div className={"row"}>
                        <div className={"form-check"}>
                            <input className={"form-check-input"} type={"radio"} value={"songs"} name={"queryType"}
                                    onChange={e => this.setState((prevState) => ({...prevState, type: "songs"}))}/>
                            <label className={"form-check-label"}>Songs</label>
                        </div>
                        <div className={"form-check"}>
                            <input className={"form-check-input"} type={"radio"} value={"artists"} name={"queryType"}
                                   onChange={e => this.setState((prevState) => ({...prevState, type: "artists"}))}/>
                            <label className={"form-check-label"}>Artists</label>
                        </div>
                        <div className={"form-check"}>
                            <input className={"form-check-input"} type={"radio"} value={"posts"} name={"queryType"}
                                   onChange={e => this.setState((prevState) => ({...prevState, type: "posts"}))}/>
                            <label className={"form-check-label"}>Posts</label>
                        </div>
                        <div className={"form-check"}>
                            <input className={"form-check-input"} type={"radio"} value={"groupeez"} name={"queryType"}
                                   onChange={e => this.setState((prevState) => ({...prevState, type: "groupeez"}))}/>
                            <label className={"form-check-label"}>Groupeez</label>
                        </div>
                        <div className={"form-check"}>
                            <input className={"form-check-input"} type={"radio"} value={"reviews"} name={"queryType"}
                                   onChange={e => this.setState((prevState) => ({...prevState, type: "reviews"}))}/>
                            <label className={"form-check-label"}>Reviews</label>
                        </div>
                    </div>
                </div>
                {
                    this.props.location.search !== '' && this.state.type === "songs" &&
                    <SongResults songs={this.props.songs}/>
                }
                {
                    this.props.location.search !== '' && this.state.type === "artists" &&
                    <SongResults songs={this.props.songs}/>
                }
                {
                    this.props.location.search !== '' && this.state.type === "posts" &&
                    <SongResults songs={this.props.songs}/>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    songs: state.spotifyReducer.songs
});

const propertyToDispatchMapper = (dispatch) => ({
    setSongs: (songs, query) => dispatch({type: 'SEARCH_SONGS', songs, query})
});

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;