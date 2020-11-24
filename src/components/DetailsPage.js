import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";
import {findSong} from "../services/SpotifyService";

class Details extends React.Component {
    state = {};

    componentDidMount() {
        const resultId = this.props.match.params.detailsId;
        const query = queryString.parse(this.props.location.search);
        const spotify = query["?spotify"], type = query.type;
        findSong(resultId, this.props.accessToken).then(song => this.props.setSong(song))
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline">Song Details</p>
                    <Link to="/search">Back to search</Link>
                </span>
                <p>Title: {this.props.song.name}</p>
                <p>Artist(s): {this.props.song.artists.map((artist, index) => (
                    artist.name + (index < this.props.song.artists.length - 1 ? ', ' : '')
                ))}</p>
                <img src={this.props.song.album.images[0].url}  alt=""/>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken,
    song: state.spotifyReducer.resultSong
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'RESULT_SONG', song})
})

const DetailsPage = connect(stateToProperty, propertyToDispatchMapper)(Details);
export default DetailsPage;