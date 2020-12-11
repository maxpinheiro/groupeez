import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {search} from "../services/SpotifyService";
import queryString from "querystring";

import userService from '../services/UserService';

class Search extends React.Component {
    state = {query: '', type: 'track,album,artist'};

    search = (query) => {
        const queryParams = {
            q: query,
            type: this.state.type,
            limit: 10
        }
        search(queryParams, this.props.accessToken).then(response => {
            if (response.tracks) {
                this.props.setSongs(response.tracks.items, query);
            }
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const query = queryString.parse(this.props.location.search)["?criteria"];
        if (query) {
            this.search(query)
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
                </div>
                { this.props.location.search !== '' &&
                 <div className="my-3">
                     <h4>Results</h4>
                     <table className="table table-striped">
                         <thead>
                         <tr>
                             <th>Title</th>
                             <th>Type</th>
                         </tr>
                         </thead>
                         <tbody>
                         {
                             this.props.songs.map(song =>
                                 <tr key={song.id}>
                                     <th>
                                         <Link to={`/details/${song.id}?spotify=true`}>{song.name}</Link>
                                     </th>
                                     <th>
                                         Song
                                     </th>
                                 </tr>
                             )
                         }
                         </tbody>
                     </table>
                 </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    songs: state.spotifyReducer.songs
})

const propertyToDispatchMapper = (dispatch) => ({
    setSongs: (songs, query) => dispatch({type: 'SEARCH_SONGS', songs, query})
})

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;