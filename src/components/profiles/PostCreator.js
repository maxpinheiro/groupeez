import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import postService from "../../services/PostService";
import userService from '../../services/UserService';

class Post extends React.Component {
    state = {
        post: {
            type: "",
            artist: "",
            artistId: "",
            title: "",
            text: ""
        },
        error: '',
        currentUser: {_id: ''},
        postType: ''
    };

    componentDidMount() {
        const postType = this.props.match.params.postType;
        const postId = this.props.match.params.postId;

        userService.getCurrentUser()
            .then(currentUser => {
                if (!currentUser.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        currentUser,
                        postType
                    }))
                }
            });

        if (postType === 'edit' && postId) {
            postService.findPostById(postId)
                .then(post => {
                    if (!post.error) {
                        document.getElementById(post.type).checked = true;
                        this.setState(prevState => ({
                            ...prevState,
                            post,
                            postType
                        }))
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            error: 'Cannot find post with id.'
                        }))
                    }
                })
        } else if (postType === 'create') {
            this.setState(prevState => ({
                ...prevState,
                post: {type: "",
                    artist: "",
                    artistId: "",
                    title: "",
                    text: ""},
                postType
            }))
        }
    }

    createPost = () => {
        if (this.state.post.type === '' || this.state.post.title === '' || this.state.post.text === '') {
            this.setState(prevState => ({
                ...prevState,
                error: "Your post must have a type, title, and body."
            }))
        } else {
            const post = {
                type: this.state.post.type,
                artist: this.state.currentUser.username,
                artistId: this.state.currentUser._id,
                title: this.state.post.title,
                text: this.state.post.text
            }
            //console.log(post);
            postService.createPost(post)
                .then(newPost => {
                    this.props.history.push(`/details/posts/${newPost._id}`);
                })
        }
    }

    savePost = () => {
        if (this.state.post.type === '' || this.state.post.title === '' || this.state.post.text === '') {
            this.setState(prevState => ({
                ...prevState,
                error: "Your post must have a type, title, and body."
            }))
        } else {
            const post = {
                _id: this.state.post._id,
                type: this.state.post.type,
                artist: this.state.currentUser.username,
                artistId: this.state.currentUser._id,
                title: this.state.post.title,
                text: this.state.post.text
            }
            console.log(post);
            postService.updatePost(post._id, post)
                .then(status => {
                    this.props.history.push(`/details/posts/${post._id}`);
                })
        }
    }

    deletePost = () => {
        if (this.state.post._id !== '') {
            postService.deletePost(this.state.post._id, this.state.currentUser._id).then(status => {
                this.props.history.push('/profile');
            })
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    {
                        this.state.postType === 'edit' ?
                            <p className="h3 d-inline mr-2">Edit your Post</p> :
                            <p className="h3 d-inline mr-2">Create a Post</p>
                    }
                </span>
                {
                    (this.state.currentUser._id !== '') &&
                    <div className="border border-2 border-secondary mt-2">
                        <div className="m-2">
                            {
                                this.state.error !== "" &&
                                <p className="pt-2 pl-2 rounded border-secondary text-danger">{this.state.error}</p>
                            }
                            <div className="row">
                                <div className="col form-group row container-fluid m-2">
                                    <label className="form-check-label font-weight-bold">Type: </label>
                                    <div className="form-check mx-3">
                                        <input className="form-check-input" type="radio" value="tour" name="roleInput" id="listener"
                                               onChange={(e) => this.setState(prevState => ({...prevState, post: {...prevState.post, type: e.target.value}}))}/>
                                        <label className="form-check-label">Tour</label>
                                    </div>
                                    <div className="form-check mr-3">
                                        <input className="form-check-input" type="radio" value="message" id="message" name="roleInput"
                                               onChange={(e) => this.setState(prevState => ({...prevState, post: {...prevState.post, type: e.target.value}}))}/>
                                        <label className="form-check-label">Message</label>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={(e) => this.setState(prevState => ({...prevState, post: {...prevState.post, title: e.target.value}}))}
                                               type="text" className="form-control" placeholder="post title" value={this.state.post.title}
                                               id="titleFld"/>
                                    </div>
                                    <div className="input-group">
                                    <textarea onChange={(e) => this.setState(prevState => ({...prevState, post: {...prevState.post, text: e.target.value}}))}
                                              className="form-control" placeholder="post text" rows="3" value={this.state.post.text}
                                              id="titleFld"/>
                                    </div>
                                </div>
                                <div className="col mt-2 border">
                                    <div className="m-2">
                                        <p className="h3">
                                            {this.state.post.title}
                                        </p>
                                        <p className="text-body">
                                            {this.state.post.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.postType === 'edit' ?
                                <button onClick={this.savePost} className="btn btn-primary mx-2">
                                    Save Post
                                </button> :
                                <button onClick={this.createPost} className="btn btn-primary mx-2">
                                    Create Post
                                </button>
                            }
                            <Link to="/profile" className="btn btn-warning mx-2">
                                Cancel
                            </Link>
                            {
                                this.state.postType === 'edit' &&
                                <button onClick={this.deletePost} className="btn btn-danger mx-2">
                                    Delete Post
                                </button>
                            }
                        </div>
                    </div>
                }
                {
                    (this.state.currentUser._id === '' || this.state.currentUser.role !== 'artist') &&
                    <div>
                        <p>You must be logged in as an Artist to access posts.</p>
                        <Link to="/login">Login</Link>
                    </div>
                }
                {
                    (this.state.noSong && this.state.currentUser._id !== '') &&
                    <div className="my-2">
                        <p className="d-inline">We couldn't find any song with this ID. Try a different </p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
})

const propertyToDispatchMapper = (dispatch) => ({
})

const PostCreator = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostCreator;