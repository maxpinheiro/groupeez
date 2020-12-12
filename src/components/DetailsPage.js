import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import userService from '../services/UserService';
import ArtistSection from "./ArtistSection";
import SongSection from "./SongSection";
import queryString from "querystring";

class Details extends React.Component {
    state = {
        detailType: "",
        detailId: "",
        accessToken: "",
        spotify: false
    };

    componentDidMount() {
        const detailType = this.props.match.params.detailType;
        const detailId = this.props.match.params.detailId;
        const spotify = queryString.parse(this.props.location.search)["?spotify"];
        userService.getAccessToken()
            .then(accessToken => {
                console.log('access token: ' + accessToken);
                this.setState(prevState => ({
                    ...prevState,
                    detailType,
                    detailId,
                    accessToken: accessToken,
                    spotify
                }));
            })
    }

    render() {
        return (
            <div className="container-fluid">
                {
                    this.state.detailType === "songs" &&
                    <SongSection detailId={this.state.detailId} accessToken={this.state.accessToken} spotify={this.state.spotify}/>
                }
                {
                    this.state.user && this.state.user.role === "artist" &&
                    <ArtistSection artistId={this.state.user.id} private={this.state.personalPage}/>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    song: state.spotifyReducer.resultSong,
    searchQuery: state.spotifyReducer.searchQuery
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'RESULT_SONG', song})
})

const DetailsPage = connect(stateToProperty, propertyToDispatchMapper)(Details);
export default DetailsPage;