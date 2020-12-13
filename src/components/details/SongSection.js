import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
import spotifyService from "../../services/SpotifyService";

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
        }
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        const accessToken = this.props.accessToken;
        const spotify = this.props.spotify;
        if (spotify) {
            spotifyService.findSong(detailId, accessToken)
                .then(song => {
                    //this.props.setSong(song)
                    this.setState(prevState => ({
                        ...prevState,
                        song
                    }));
                });
        } else {
            console.log('not on spotify');
            // go to local database
        }
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">
                <span>
                    <p className="h3 d-inline mr-2">Song Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                <p>Title: {this.state.song.name}</p>
                <p>Artist(s): {this.state.song.artists.map((artist, index) => (
                    artist.name + (index < this.state.song.artists.length - 1 ? ', ' : '')
                ))}</p>
                <img src={this.state.song.album.images[0].url}  alt=""/>
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