import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import postService from '../../services/PostService';

class Post extends React.Component {
    state = {
        searchQuery: "",
        error: "",
        post: {
            id: "",
            type: "",
            artist: "",
            artistId: "",
            title: "",
            text: ""
        }
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        postService.findPostById(detailId)
            .then(post => {
                if (!post.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        post
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        error: "There is no detail with this ID.",
                        post: null
                    }))
                }

            });
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Post Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    this.state.error !== "" &&
                    <p className="p-2 rounded border-secondary text-danger">{this.state.error}</p>
                }
                <div className="border border-2 border-secondary container-fluid mt-2">
                    <div className="m-2">
                        <div className="row">
                            <p className="h2 my-auto">
                                {this.state.post.title}
                            </p>
                            <p className="h4 mx-4 my-auto">
                                By
                                <Link to={`/profile/${this.state.post.artistId}`} className="ml-2">{this.state.post.artist}</Link>
                            </p>
                            <p className="text-body my-auto">
                                Type: {this.state.post.type}
                            </p>
                        </div>
                        <div className="row">
                            <p className="text-body my-auto">
                                {this.state.post.text}
                            </p>
                        </div>
                    </div>
                </div>
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