import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from "querystring";

import SongResults from "./SongResults";
import AlbumResults from "./AlbumResults";
import ReviewResults from "./ReviewResults";
import PostResults from "./PostResults";
import ArtistResults from "./ArtistResults";
import ListenerResults from "./ListenerResults";

class Search extends React.Component {
    state = {searchQuery: '', searchType: '', typeInput: '', searchInput: ''};

    componentDidMount() {
        const searchQuery = queryString.parse(this.props.location.search)["?criteria"];
        const searchType = queryString.parse(this.props.location.search)["type"];
        //console.log('q: ' + searchQuery + ', t: ' + searchType);
        if (searchQuery && searchType) {
            //console.log('q: ' + searchQuery + ', t: ' + searchType);
            document.getElementById(searchType).checked=true;
            this.setState(prevState => ({...prevState, searchQuery, searchType, searchInput: searchQuery}));
            this.props.setSearch(searchType, searchQuery);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const searchQuery = queryString.parse(this.props.location.search)["?criteria"];
        const searchType = queryString.parse(this.props.location.search)["type"];
        if ((searchQuery && searchType) && (searchType !== prevState.searchType || searchQuery !== prevState.searchQuery)) {
            //console.log('q: ' + searchQuery + ', t: ' + searchType);
            document.getElementById(searchType).checked=true;
            this.setState(prevState => ({...prevState, searchQuery, searchType, searchInput: searchQuery}));
            this.props.setSearch(searchType, searchQuery);

        } else if ((!searchQuery && !searchType) && (prevState.searchQuery !== '' && prevState.searchType !== '')) {
            document.getElementById(prevState.searchType).checked=false;
            this.setState({typeInput: '', searchQuery: '', searchType: '', searchInput: ''});
        }

    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">
                <div className="m-2">
                    <span>
                        <p className="h2 d-inline">Search</p>
                        {
                            this.props.location.search !== '' &&
                            <Link to="/search" className="my-auto ml-2">Clear search</Link>
                        }
                    </span>
                    <div className="input-group mt-2">
                        <input className="form-control" placeholder="search for a song..." value={this.state.searchInput}
                               onChange={(e) => this.setState(prevState => ({...prevState, searchInput: e.target.value}))}/>
                        <div className="input-group-append">
                            <Link className="btn btn-primary" to={`/search?${queryString.stringify({criteria: this.state.searchInput, type: this.state.typeInput})}`}>
                                Search
                            </Link>
                        </div>
                    </div>
                    <div className="input-group mt-2">
                        <div className={"row"}>
                            <label className={"form-check-label font-weight-bold ml-3"}>Data: </label>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"songs"} name={"queryType"} id={"songs"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "songs"}))}/>
                                <label className={"form-check-label"}>Songs</label>
                            </div>
                            <div className={"form-check mx-2"}>
                                <input className={"form-check-input"} type={"radio"} value={"albums"} name={"queryType"} id={"albums"}
                                       onChange={e => this.setState((prevState) => ({...prevState, typeInput: "albums"}))}/>
                                <label className={"form-check-label"}>Albums</label>
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
                            <label className={"form-check-label font-weight-bold ml-3"}>Users: </label>
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
                        </div>
                    </div>
                    {
                        this.state.searchType === "songs" && <SongResults />
                    }
                    {
                        this.state.searchType === "albums" && <AlbumResults />
                    }
                    {
                        this.state.searchType === "artists" && <ArtistResults />
                    }
                    {
                        this.state.searchType === "groupeez" && <ListenerResults />
                    }
                    {
                        this.state.searchType === "posts" && <PostResults />
                    }
                    {
                        this.state.searchType === "reviews" && <ReviewResults />
                    }
                </div>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    searchQuery: state.spotifyReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setSearch: (searchType, searchQuery) => dispatch({type: 'SET_SEARCH', searchType, searchQuery})
});

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;