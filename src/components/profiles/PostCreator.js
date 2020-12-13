import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import postService from "../../services/PostService";
import userService from '../../services/UserService';
import artistService from '../../services/ArtistService';

class Post extends React.Component {
    state = {
        post: {
            id: "",
            type: "",
            artist: "",
            artistId: "",
            title: "",
            text: ""
        },
        artist: {
          id: "",
          username: ""
        },
        error: '',
        currentUser: {id: ''},
        postType: ''
    };

    componentDidMount() {
        const postType = this.props.match.params.postType;
        const postId = this.props.match.params.postId;

        if (postType === 'edit') {
            postService.findPostById(postId)
                .then(post => {
                    if (!post.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            post,
                            postType
                        }))
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            error: "We couldn't find any post with this id."
                        }))
                    }
                })
        }

        userService.getCurrentUser()
            .then(currentUser => {
                if (!currentUser.error) {
                    if (currentUser.role === 'artist') {
                        artistService.findArtistById(currentUser.id)
                            .then(artist => {
                                this.setState(prevState => ({
                                    ...prevState,
                                    artist,
                                    currentUser
                                }))
                            })
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            error: "Only artists can make posts."
                        }))
                    }

                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        error: "You must be logged in to make a post."
                    }))
                }

            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
                artistId: this.state.currentUser.id,
                title: this.state.post.title,
                text: this.state.post.text
            }
            console.log(post);
            postService.createPost(post)
                .then(newPost => {
                    this.props.history.push(`/details/posts/${newPost.id}`);
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
                type: this.state.post.type,
                artist: this.state.currentUser.username,
                artistId: this.state.currentUser.id,
                title: this.state.post.title,
                text: this.state.post.text
            }
            console.log(post);
            postService.updatePost(post)
                .then(newPost => {
                    this.props.history.push(`/details/posts/${newPost.id}`);
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
                    (!this.state.noSong && this.state.currentUser.id !== '') &&
                    <div className="border border-2 border-secondary">
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
                                        <input className="form-check-input" type="radio" value="artist" id="message" name="roleInput"
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
                                <button onClick={this.createPost} className="btn btn-primary mx-2">
                                    Save Post
                                </button> :
                                <button onClick={this.savePost} className="btn btn-primary mx-2">
                                    Create Post
                                </button>
                            }
                            <Link to="/profile" className="btn btn-warning mx-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                }
                {
                    (this.state.currentUser.id === '' || this.state.currentUser.role !== 'artist') &&
                    <div>
                        <p>You must be logged in as an Artist to create a review.</p>
                        <Link to="/login">Login</Link>
                    </div>
                }
                {
                    (this.state.noSong && this.state.currentUser.id !== '') &&
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