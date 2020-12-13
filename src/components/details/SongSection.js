import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
import userService from '../../services/UserService';
import spotifyService from "../../services/SpotifyService";
import songService from '../../services/SongService';

class Song extends React.Component {
    state = {
        searchQuery: "",
        song: {
            name: "",
            artists: [{name: ""}],
            album: {
                images: [{
                    url: ""
                }]
            }
        },
        noSong: true,
        spotify: false
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        const accessToken = this.props.accessToken;
        const spotify = this.props.spotify;
        if (spotify) {
            spotifyService.findSong(detailId, accessToken)
                .then(song => {
                    if (!song.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: false,
                            song,
                            spotify: true
                        }));
                    }
                    //this.props.setSong(song)
                });
        } else {
            console.log('not on spotify');
            // go to local database
            songService.findSongById(detailId)
                .then(song => {
                    if (!song.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: false,
                            song,
                            spotify: false
                        }));
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: true,
                            spotify: false
                        }));
                    }
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const detailId = this.props.detailId;
        const accessToken = this.props.accessToken;
        const spotify = this.props.spotify;
        if (spotify && !prevProps.spotifyId) {
            spotifyService.findSong(detailId, accessToken)
                .then(song => {
                    if (!song.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: false,
                            song,
                            spotify: true
                        }));
                    }
                    //this.props.setSong(song)
                });
        } else if (!spotify && prevProps.spotify) {
            console.log('not on spotify');
            // go to local database
            songService.findSongById(detailId)
                .then(song => {
                    if (!song.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: false,
                            song,
                            spotify: false
                        }));
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: true,
                            spotify: false
                        }));
                    }
                })
        }
    }

    /*refreshToken = () => {
        userService.getRefreshToken()
            .then(refreshToken => {
                spotifyService.refreshToken(refreshToken)
                    .then(res => {
                        const accessToken = res.access_token;
                        console.log('access token: ' + accessToken);
                        this.setState(prevState => ({
                            ...prevState,
                            accessToken
                        }))
                    })
            })
    }*/

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Song Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'songs'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    !this.state.noSong &&
                    <div className="border border-2 border-secondary">
                        <div className="m-2">
                            {
                                this.state.spotify &&
                                <div>
                                    <p>Title: {this.state.song.name}</p>
                                    <p>Artist(s): {this.state.song.artists.map((artist, index) =>
                                        (<Link to={`/profile/${artist.id}`}>
                                            {artist.name + (index < this.state.song.artists.length - 1 ? ', ' : '')}
                                        </Link>)
                                    )}</p>
                                    <img src={this.state.song.album.images[0].url}  alt=""/>
                                </div>
                            }
                            {
                                !this.state.spotify &&
                                <div>
                                    <p>Title: {this.state.song.title}</p>
                                    <p>Artist(s): {this.state.song.artists.map((artist, index) => (
                                        (artist) + (index < this.state.song.artists.length - 1 ? ', ' : '')
                                    ))}</p>
                                    <img src={this.state.song.images[0].url}  alt=""/>
                                </div>
                            }

                        </div>
                    </div>
                }
                {
                    this.state.noSong &&
                    <div className="my-2">
                        <p className="d-inline">We couldn't find any song with this ID. Try a different </p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    //accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    song: state.spotifyReducer.resultSong,
    searchQuery: state.spotifyReducer.searchQuery
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'RESULT_SONG', song})
})

const SongSection = connect(stateToProperty, propertyToDispatchMapper)(Song);
export default SongSection;