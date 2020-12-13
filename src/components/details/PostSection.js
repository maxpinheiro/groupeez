import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import postService from '../../services/PostService';

class Post extends React.Component {
    state = {
        searchQuery: "",
        post: {
            id: "",
            type: "",
            artist: "",
            artistId: "",
            title: "",
            text: ""
        },
        noPost: true
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        postService.findPostById(detailId)
            .then(post => {
                if (!post.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        post,
                        noPost: false
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        noPost: true
                    }))
                }

            });
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Post Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'posts'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    !this.state.noPost &&
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
                }
                {
                    this.state.noPost &&
                    <div className="my-2">
                        <p className="d-inline">We couldn't find any post with this ID. Try a different </p>
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

const PostSection = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostSection;