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
            images: [{
                url: ""
            }]
        },
        noAlbum: true
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        const accessToken = this.props.accessToken;
        const spotify = this.props.spotify;
        if (spotify) {
            spotifyService.findAlbum(detailId, accessToken)
                .then(album => {
                    //this.props.setSong(song)
                    console.log(album);
                    if (!album.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            album,
                            noAlbum: false
                        }));
                    }
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
                    !this.state.noAlbum &&
                    <div className="border border-2 border-secondary container-fluid">
                        <div className="m-2">
                            <p>Title: {this.state.album.name}</p>
                            <p>Artist(s): {this.state.album.artists.map((artist, index) => (
                                artist.name + (index < this.state.album.artists.length - 1 ? ', ' : '')
                            ))}</p>
                            <img src={this.state.album.images[0].url}  alt=""/>
                        </div>
                    </div>
                }
                {
                    this.state.noAlbum &&
                    <div className="my-2">
                        <p className="d-inline">We couldn't find any album with this ID. Try a different </p>
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

const AlbumSection = connect(stateToProperty, propertyToDispatchMapper)(Album);
export default AlbumSection;