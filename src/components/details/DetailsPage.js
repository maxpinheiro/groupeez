import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import userService from '../../services/UserService';
import SongSection from "./SongSection";
import queryString from "querystring";
import AlbumSection from "./AlbumSection";
import ReviewSection from "./ReviewSection";
import PostSection from "./PostSection";

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
                    this.state.detailType === "albums" &&
                    <AlbumSection detailId={this.state.detailId} accessToken={this.state.accessToken} spotify={this.state.spotify}/>
                }
                {
                    this.state.detailType === "reviews" &&
                    <ReviewSection detailId={this.state.detailId} accessToken={this.state.accessToken}/>
                }
                {
                    this.state.detailType === "posts" &&
                    <PostSection detailId={this.state.detailId} accessToken={this.state.accessToken}/>
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