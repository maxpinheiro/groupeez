import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
import spotifyService from "../../services/SpotifyService";

class Album extends React.Component {
    state = {
        searchQuery: "",
        album: {
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
            spotifyService.findAlbum(detailId, accessToken)
                .then(album => {
                    //this.props.setSong(song)
                    this.setState(prevState => ({
                        ...prevState,
                        album
                    }));
                });
        } else {
            console.log('not on spotify');
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Album Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    /*
                    <p>Title: {this.state.album.name}</p>
                    <p>Artist(s): {this.state.album.artists.map((artist, index) => (
                    artist.name + (index < this.state.album.artists.length - 1 ? ', ' : '')
                ))}</p>
                    <img src={this.state.album.album.images[0].url}  alt=""/>
                    *
                     */
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

const AlbumSection = connect(stateToProperty, propertyToDispatchMapper)(Album);
export default AlbumSection;