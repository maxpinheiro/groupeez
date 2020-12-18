import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import spotifyService from "../../services/SpotifyService";
import songService from '../../services/SongService';

class Song extends React.Component {
    state = {
        error: ''
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        if (detailId.length === 22) { // /details/songs/spotifyId
            spotifyService.findSong(detailId, this.props.accessToken).then(song => {
                if (!song.error) { // found song on spotify
                    this.props.setSong(song);
                } else if (song.error.status) {
                    spotifyService.refreshToken(this.props.refreshToken).then(response => {
                        if (response.access_token) {
                            spotifyService.findSong(detailId, response.access_token).then(song => {
                                if (!song.error) { // found song on spotify
                                    this.props.setSong(song);
                                    this.props.setTokens(response.access_token, response.refresh_token);
                                } else { // didnt find song on spotify
                                    this.setState(prevState => ({
                                        ...prevState,
                                        error: 'Cannot find Spotify song with id.'
                                    }))
                                }
                            })
                        } else { // couldnt get refresh token
                            this.setState(prevState => ({
                                ...prevState,
                                error: 'There was a problem authorizing with Spotify.'
                            }))
                        }
                    })
                } else { // didnt find song on spotify
                    this.setState(prevState => ({
                        ...prevState,
                        error: 'Cannot find Spotify song with id.'
                    }))
                }
            })
        } else if (detailId.length === 24) { // /details/songs/localId
            songService.findSongById(detailId).then(song => {
                if (!song.error) { // found song in database
                    this.props.setSong(song);
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        error: 'Cannot find song with id.'
                    }));
                }
                })
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: 'Cannot find song with id.'
            }));
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Song Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'songs'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    (this.props.song._id !== '' || this.props.song.id !== '') &&
                    <div className="border border-2 border-secondary mt-2">
                        <div className="m-2">
                            {
                                this.props.song.id &&
                                <div>
                                    <p>Title: {this.props.song.name}</p>
                                    <p>Artist(s): {this.props.song.artists.map((artist, index) =>
                                        (<Link to={`/profile/${artist.id}`} id={artist.id}>
                                            {artist.name + (index < this.props.song.artists.length - 1 ? ', ' : '')}
                                        </Link>)
                                    )}</p>
                                    <img src={this.props.song.album.images[0].url}  alt=""/>
                                </div>
                            }
                            {
                                this.props.song._id &&
                                <div>
                                    <p>Title: {this.props.song.title}</p>
                                    <p>Artist(s): {this.props.song.artists.map((artist, index) => (
                                        (<Link to={`/profile/${this.props.song.artistIds[index]}`} id={this.props.song.artistIds[index]}>
                                            {artist + (index < this.props.song.artists.length - 1 ? ', ' : '')}
                                        </Link>)
                                    ))}</p>
                                    <img src={this.props.song.images[0]}  alt=""/>
                                </div>
                            }
                            <Link to={`/reviews/create/${this.props.song._id || this.props.song.id}`}>Leave a review!</Link>
                        </div>
                    </div>
                }
                {
                    this.state.error !== "" &&
                    <div className="my-2">
                        <p className="d-inline">{this.state.error + 'Try a different'} </p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    searchQuery: state.spotifyReducer.searchQuery,
    refreshToken: state.spotifyReducer.refreshToken,
    accessToken: state.spotifyReducer.accessToken,
    song: state.detailsReducer.song
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'SET_SONG', song}),
    setTokens: (accessToken, refreshToken) => dispatch({type: 'TOKENS', accessToken, refreshToken})
})

const SongSection = connect(stateToProperty, propertyToDispatchMapper)(Song);
export default SongSection;