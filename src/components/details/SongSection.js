import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
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
        noSong: true
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
                            song
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
                            song
                        }));
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            noSong: true
                        }));
                    }
                })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Song Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    !this.state.noSong &&
                    <div className="border border-2 border-secondary">
                        <div className="m-2">
                            <p>Title: {this.state.song.name || this.state.song.title}</p>
                            <p>Artist(s): {this.state.song.artists.map((artist, index) => (
                                (artist.name || artist) + (index < this.state.song.artists.length - 1 ? ', ' : '')
                            ))}</p>
                            {
                                this.state.song.album &&
                                <img src={this.state.song.album.images[0].url}  alt=""/>
                            }
                            {
                                this.state.song.images &&
                                <img src={this.state.song.images[0].url}  alt=""/>
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