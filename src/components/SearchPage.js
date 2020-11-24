import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {search} from "../services/SpotifyService";

class Search extends React.Component {
    state = {query: '', type: 'track,album,artist'};

    search = () => {
        const queryParams = {
            q: this.state.query,
            type: this.state.type,
            limit: 10
        }
        search(queryParams, this.props.accessToken).then(response => {
            if (response.tracks) {
                this.props.setSongs(response.tracks.items)
            }
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <h3>Search Spotify</h3>
                <div className="input-group">
                    <input className="form-control" placeholder="search for songs, albums, or artists..." value={this.state.query}
                            onChange={(e) => this.setState({query: e.target.value})}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={this.search}>
                            Search
                        </button>
                    </div>
                </div>
                <h4>Songs</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.songs.map(song =>
                                <tr key={song.id}>
                                    <th>
                                        <Link to={`/details/${song.id}?spotify=true`}>{song.name}</Link>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
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
    setSongs: (songs) => dispatch({type: 'SEARCH_SONGS', songs})
})

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;