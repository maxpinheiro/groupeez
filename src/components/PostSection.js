import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

class Post extends React.Component {
    state = {
        searchQuery: "",
        post: {

        }
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Album Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>

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

const PostSection = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostSection;