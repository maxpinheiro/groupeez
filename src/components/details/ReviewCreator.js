import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import reviewService from '../../services/ReviewService';
import spotifyService from "../../services/SpotifyService";
import songService from "../../services/SongService";
import userService from '../../services/UserService';

class Review extends React.Component {
    state = {
        searchQuery: "",
        song: {
            name: "",
            artists: [{name: ""}],
            album: {
                images: [{
                    url: ""
                }]
            },
            id: '',
            title: '',
            artistId: [],
            images: []
        },
        review: {
            id: "",
            creator: "",
            creatorId: "",
            songId: "",
            title: "",
            text: ""
        },
        error: '',
        currentUser: {id: ''}
    };

    componentDidMount() {
        const detailType = this.props.match.params.detailType;
        const detailId = this.props.match.params.detailId;

        userService.getCurrentUser()
            .then(currentUser => {
                if (currentUser.error) return;
                this.setState(prevState => ({
                    ...prevState,
                    currentUser
                }))
            })

        if (detailType === 'songs') {
            if (detailId.length > 10) {
                userService.getAccessToken()
                    .then(accessToken => {
                        spotifyService.findSong(detailId, accessToken)
                            .then(song => {
                                if (!song.error) {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        noSong: false,
                                        song
                                    }));
                                } else {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        noSong: true
                                    }));
                                }
                                //this.props.setSong(song)
                            });
                    })
            } else {
                // go to local database
                songService.findSongById(detailId)
                    .then(song => {
                        if (!song.error) {
                            this.setState(prevState => ({
                                ...prevState,
                                noSong: false,
                                song
                            }));
                        } else {
                            this.setState(prevState => ({
                                ...prevState,
                                noSong: true
                            }));
                        }
                    })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const detailType = this.props.match.params.detailType;
        const detailId = this.props.match.params.detailId;

        if (prevState.currentUser.id === '') {
            userService.getCurrentUser()
                .then(currentUser => {
                    if (currentUser.error) return;
                    this.setState(prevState => ({
                        ...prevState,
                        currentUser
                    }))
                })
        }

        if (detailType === 'songs' && prevProps.match.params.detailType !== 'songs') {
            if (detailId.length > 10) {
                userService.getAccessToken()
                    .then(accessToken => {
                        spotifyService.findSong(detailId, accessToken)
                            .then(song => {
                                if (!song.error) {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        noSong: false,
                                        song
                                    }));
                                } else {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        noSong: true
                                    }));
                                }
                                //this.props.setSong(song)
                            });
                    })
            } else {
                // go to local database
                songService.findSongById(detailId)
                    .then(song => {
                        if (!song.error) {
                            this.setState(prevState => ({
                                ...prevState,
                                noSong: false,
                                song
                            }));
                        } else {
                            this.setState(prevState => ({
                                ...prevState,
                                noSong: true
                            }));
                        }
                    })
            }
        }
    }

    createReview = () => {
        if (this.state.review.title === '' || this.state.review.text === '') {
            this.setState(prevState => ({
                ...prevState,
                error: "Your review must have a title and body."
            }))
        } else {
            const review = {
                creator: this.state.currentUser.username,
                creatorId: this.state.currentUser.id,
                songId: this.state.song.id,
                title: this.state.review.title,
                text: this.state.review.text
            }
            reviewService.createReview(review)
                .then(newReview => {
                    this.props.history.push(`/details/reviews/${newReview.id}`);
                })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Create a Review</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'reviews'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    (!this.state.noSong && this.state.currentUser.id !== '') &&
                    <div className="border border-2 border-secondary">
                        <div className="m-2">
                            <div>
                                You are creating a review for:
                                <Link to={`/details/songs/${this.state.song.id}`} className="ml-2">
                                    {this.state.song.name || this.state.song.title}
                                </Link>
                            </div>
                            {
                                this.state.error !== "" &&
                                <p className="pt-2 pl-2 rounded border-secondary text-danger">{this.state.error}</p>
                            }
                            <div className="row">
                                <div className="col form-group row container-fluid m-2">
                                    <div className="input-group">
                                        <input onChange={(e) => this.setState(prevState => ({...prevState, review: {...prevState.review, title: e.target.value}}))}
                                               type="text" className="form-control" placeholder="review title"
                                               id="titleFld"/>
                                    </div>
                                    <div className="input-group">
                                    <textarea onChange={(e) => this.setState(prevState => ({...prevState, review: {...prevState.review, text: e.target.value}}))}
                                              className="form-control" placeholder="review text" rows="3"
                                              id="titleFld"/>
                                    </div>
                                </div>
                                <div className="col mt-2 border">
                                    <div className="m-2">
                                        <p className="h3">
                                            {this.state.review.title}
                                        </p>
                                        <p className="text-body">
                                            {this.state.review.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.createReview} className="btn btn-primary mx-2">
                                Create Review
                            </button>
                            <button className="btn btn-warning mx-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                }
                {
                    (this.state.currentUser.id === '' || this.state.currentUser.role !== 'listener') &&
                    <div>
                        <p>You must be logged in as a Listener to create a review.</p>
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

const ReviewCreator = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewCreator;