import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//import queryString from "querystring";
import {findSong} from "../services/SpotifyService";
import queryString from "querystring";

class Details extends React.Component {
    state = {};

    componentDidMount() {
        const resultId = this.props.match.params.detailsId;
        //const query = queryString.parse(this.props.location.search);
        //const spotify = query["?spotify"], type = query.type;
        findSong(resultId, this.props.accessToken).then(song => this.props.setSong(song))
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Song Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
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
    song: state.spotifyReducer.resultSong,
    searchQuery: state.spotifyReducer.searchQuery
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'RESULT_SONG', song})
})

const DetailsPage = connect(stateToProperty, propertyToDispatchMapper)(Details);
export default DetailsPage;