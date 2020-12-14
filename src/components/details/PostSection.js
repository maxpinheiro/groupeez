import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import postService from '../../services/PostService';
import userService from "../../services/UserService";

class Post extends React.Component {
    state = {
        currentUser: '',
        error: ''
    };

    componentDidMount() {
        const detailId = this.props.detailId;

        userService.getCurrentUser()
            .then(currentUser => {
                if (!currentUser.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        currentUser: currentUser._id
                    }))
                }
            });

        postService.findPostById(detailId).then(post => {
            if (!post.error) {
                this.props.setPost(post);
            } else { // can't find review with id
                this.setState(prevState => ({
                    ...prevState,
                    error: 'Cannot find post with id.'
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
                    this.state.error === "" &&
                    <div className="border border-2 border-secondary container-fluid mt-2">
                        <div className="m-2">
                            <div className="row">
                                <p className="h2 my-auto">
                                    {this.props.post.title}
                                </p>
                                <p className="h4 mx-4 my-auto">
                                    By
                                    <Link to={`/profile/${this.props.post.artistId}`} className="ml-2">{this.props.post.artist}</Link>
                                </p>
                                <p className="text-body my-auto">
                                    Type: {this.props.post.type}
                                </p>
                            </div>
                            <div className="row">
                                <p className="text-body my-auto">
                                    {this.props.post.text}
                                </p>
                            </div>
                            {
                                (this.props.post.artistId === this.state.currentUser && this.state.currentUser !== '') &&
                                <Link to={`/posts/edit/${this.props.post._id}`}>Edit your post</Link>
                            }
                        </div>
                    </div>
                }
                {
                    this.state.error !== '' &&
                    <div className="my-2">
                        <p className="d-inline">{this.state.error + ' Try a different'}</p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    searchQuery: state.spotifyReducer.searchQuery,
    post: state.detailsReducer.post
})

const propertyToDispatchMapper = (dispatch) => ({
    setPost: (post) => dispatch({type: 'SET_POST', post})
})

const PostSection = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostSection;