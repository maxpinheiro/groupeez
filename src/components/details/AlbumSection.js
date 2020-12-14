import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
import spotifyService from "../../services/SpotifyService";

class Album extends React.Component {
    state = {
        error: ''
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        if (detailId.length === 22) { // /details/songs/spotifyId
            spotifyService.findAlbum(detailId, this.props.accessToken).then(album => {
                if (!album.error) { // found song on spotify
                    console.log(album);
                    this.props.setAlbum(album);
                } else if (album.error.status === 401) {
                    spotifyService.refreshToken(this.props.refreshToken).then(response => {
                        if (response.access_token) {
                            spotifyService.findAlbum(detailId, response.access_token).then(album => {
                                if (!album.error) { // found song on spotify
                                    this.props.setAlbum(album);
                                    this.props.setTokens(response.access_token, response.refresh_token);
                                } else { // didnt find song on spotify
                                    this.setState(prevState => ({
                                        ...prevState,
                                        error: 'Cannot find Spotify album with id.'
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
                        error: 'Cannot find Spotify album with id.'
                    }))
                }
            })
        } else if (detailId.length === 24) { // /details/songs/localId
            this.setState(prevState => ({
                ...prevState,
                error: 'Cannot find album with id.'
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: 'Cannot find album with id.'
            }));
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Album Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'albums'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    this.props.album.id !== '' &&
                    <div className="border border-2 border-secondary container-fluid mt-2">
                        <div className="m-2">
                            <p>Title: {this.props.album.name}</p>
                            <p>Artist(s): {this.props.album.artists.map((artist, index) =>
                                (<Link to={`/profile/${artist.id}`} id={artist.id}>
                                    {artist.name + (index < this.props.album.artists.length - 1 ? ', ' : '')}
                                </Link>)
                            )}</p>
                            <img src={this.props.album.images[0].url}  alt=""/>
                        </div>
                    </div>
                }
                {
                    this.state.error &&
                    <div className="my-2">
                        <p className="d-inline">{this.state.error} Try a different </p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    searchQuery: state.spotifyReducer.searchQuery,
    album: state.detailsReducer.album
})

const propertyToDispatchMapper = (dispatch) => ({
    setAlbum: (album) => dispatch({type: 'SET_ALBUM', album}),
    setTokens: (accessToken, refreshToken) => dispatch({type: "TOKENS", accessToken, refreshToken})
})

const AlbumSection = connect(stateToProperty, propertyToDispatchMapper)(Album);
export default AlbumSection;