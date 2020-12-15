import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import userService from "../../services/UserService";
import spotifyService from "../../services/SpotifyService";
import songService from "../../services/SongService";

class Song extends React.Component {
    state = {
        error: ''
    };

    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        //console.log('search type: ' + searchType + ' search query: ' + searchQuery);
        if (searchQuery !== '' && searchType === 'songs') {
            this.searchSongs(searchQuery);
        }
    }

    searchSongs = (query) => {
        const queryParams = {
            q: query,
            type: "track",
            limit: 10
        }
        let combinedSongs = [];
        songService.querySong(query).then(songs => {
            combinedSongs = combinedSongs.concat(songs);
            userService.getAccessToken()
                .then(accessToken => {
                    spotifyService.search(queryParams, accessToken).then(response => {
                        if (!response.error) {
                            combinedSongs = combinedSongs.concat(response.tracks.items);
                            this.props.setSongs(combinedSongs);
                        } else if (response.error.status === 401) {
                          spotifyService.refreshToken(this.props.refreshToken).then(response => {
                              if (response.access_token) {
                                  spotifyService.search(queryParams, response.access_token).then(res => {
                                      combinedSongs = combinedSongs.concat(res.tracks.items);
                                      this.props.setSongs(combinedSongs);
                                  })
                              } else { // couldnt get refresh token
                                  this.props.setSongs(combinedSongs);
                              }
                          })
                        } else {
                            this.props.setSongs(combinedSongs);
                        }
                    });
                })
        })

    };

    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist(s)</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.songs.map(song =>
                            <tr key={song._id}>
                                <th>
                                    <Link to={`/details/songs/${song.id || song._id}`}>{song.name || song.title}</Link>
                                </th>
                                <th>
                                    {
                                        song.artists.map((artist, index) => (
                                            <Link to={`/profile/${artist._id || (song.artistIds && song.artistIds[index])}`}>
                                                {(artist.name || artist) + (index < song.artists.length - 1 ? ', ' : '')}
                                            </Link>
                                        ))
                                    }
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
        );
    }
}

const stateToProperty = (state) => ({
    refreshToken: state.spotifyReducer.refreshToken,
    songs: state.searchReducer.songResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setSongs: (songs) => dispatch({type: 'SET_SONGS', songs})
});

const SongResults = connect(stateToProperty, propertyToDispatchMapper)(Song);
export default SongResults;