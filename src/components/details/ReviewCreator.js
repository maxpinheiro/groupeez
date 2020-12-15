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
        review: {
            _id: "",
            creator: "",
            creatorId: "",
            songId: "",
            title: "",
            text: ""
        },
        error: '',
        currentUser: {_id: '', role: ''},
        reviewType: '',
        artistUser: ''
    };

    componentDidMount() {
        const reviewType = this.props.match.params.reviewType;
        const detailId = this.props.match.params.detailId;

        userService.getCurrentUser()
            .then(currentUser => {
                if (!currentUser.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        currentUser,
                        reviewType
                    }))
                }
            })

        if (reviewType === 'edit') {
            reviewService.findReviewById(detailId)
                .then(review => {
                    if (!review.error) {
                        this.setState(prevState => ({
                            ...prevState,
                            review
                        }));
                    } else {
                        this.setState(prevState => ({
                            ...prevState,
                            error: 'Cannot find review with id.'
                        }));
                    }
                })
        }

        if (detailId.length === 22) {
                userService.getAccessToken()
                    .then(accessToken => {
                        spotifyService.findSong(detailId, accessToken)
                            .then(song => {
                                if (!song.error) {
                                    this.props.setSong(song);
                                } else {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        error: 'Cannot find Spotify song with id.'
                                    }));
                                }
                            });
                    })
            } else if (detailId.length === 24 && reviewType === 'create') {
                // go to local database
                songService.findSongById(detailId)
                    .then(song => {
                        if (!song.error) {
                            this.props.setSong(song);
                        } else {
                            this.setState(prevState => ({
                                ...prevState,
                                error: 'Cannot find song with id.'
                            }));
                        }
                    })
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
                creatorId: this.state.currentUser._id,
                songId: this.props.song._id || this.props.song.id,
                title: this.state.review.title,
                text: this.state.review.text
            }
            reviewService.createReview(review, this.state.artistUser)
                .then(newReview => {
                    this.props.history.push(`/details/reviews/${newReview._id}`);
                })
        }
    }

    saveReview = () => {
        if (this.state.review.title === '' || this.state.review.text === '') {
            this.setState(prevState => ({
                ...prevState,
                error: "Your review must have a title and body."
            }))
        } else {
            const review = {
                ... this.state.review,
                creator: this.state.currentUser.username,
                creatorId: this.state.currentUser._id,
                songId: this.props.song._id || this.props.song.id,
                title: this.state.review.title,
                text: this.state.review.text
            }
            reviewService.updateReview(review._id, review)
                .then(newReview => {
                    this.props.history.push(`/details/reviews/${newReview._id}`);
                })
        }
    }

    deleteReview = () => {
        if (this.state.review._id !== '') {
            songService.findSongById(this.state.review.songId).then(song => {
                if (!song.error) {
                    reviewService.deleteReview(this.state.review._id, this.state.currentUser._id, song.artistIds[0]).then(status => {
                        this.props.history.push('/profile');
                    })
                } else {
                    reviewService.deleteReview(this.state.review._id, this.state.currentUser._id).then(status => {
                        this.props.history.push('/profile');
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    {
                        this.state.reviewType === 'edit' ?
                        <p className="h3 d-inline mr-2">Edit your Review</p> :
                        <p className="h3 d-inline mr-2">Create a Review</p>
                    }
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'reviews'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    (this.state.error === '' && this.state.currentUser._id !== '') &&
                    <div className="border border-2 border-secondary mt-2">
                        <div className="m-2">
                            <div>
                                {this.state.reviewType === 'edit' ? 'You are editing your review for: ' : 'You are creating a review for: '}
                                <Link to={`/details/songs/${this.props.song._id}`} className="ml-2">
                                    {this.props.song.name || this.props.song.title}
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
                                               type="text" className="form-control" placeholder="review title" value={this.state.review.title}
                                               id="titleFld"/>
                                    </div>
                                    <div className="input-group">
                                    <textarea onChange={(e) => this.setState(prevState => ({...prevState, review: {...prevState.review, text: e.target.value}}))}
                                              className="form-control" placeholder="review text" rows="3" value={this.state.review.text}
                                              id="titleFld"/>
                                    </div>
                                    {
                                        this.state.reviewType === 'create' &&
                                        <div className="input-group">
                                            <label className="form-check-label my-auto mr-2">Artist has a Groupeez account? add username: </label>
                                            <input onChange={(e) => this.setState(prevState => ({...prevState, artistUser: e.target.value}))}
                                                   type="text" className="form-control" placeholder="artist username" value={this.state.artistUser}
                                                   id="artistUserFld"/>
                                        </div>
                                    }
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
                            {
                                this.state.reviewType === 'edit' ?
                                <button onClick={this.saveReview} className="btn btn-primary mx-2">
                                    Save Review
                                </button> :
                                <button onClick={this.createReview} className="btn btn-primary mx-2">
                                    Create Review
                                </button>
                            }
                            {
                                this.state.reviewType === 'edit' ?
                                <Link to={`/details/reviews/${this.state.review._id}`} className="btn btn-warning mx-2">
                                    Cancel
                                </Link> :
                                <Link to={`/details/songs/${this.props.song._id || this.props.song.id}`} className="btn btn-warning mx-2">
                                    Cancel
                                </Link>
                            }
                            {
                                this.state.reviewType === 'edit' &&
                                <button onClick={this.deleteReview} className="btn btn-danger mx-2">
                                    Delete Review
                                </button>
                            }
                        </div>
                    </div>
                }
                {
                    (this.state.currentUser._id === '' || this.state.currentUser.role !== 'listener') &&
                    <div>
                        <p>You must be logged in as a Listener to create a review.</p>
                        <Link to="/login">Login</Link>
                    </div>
                }
                {
                    (this.state.error !== '') &&
                    <div className="my-2">
                        <p className="d-inline">{this.state.error} Try a different </p>
                        <Link to="/search" className="">search.</Link>
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    song: state.detailsReducer.song
})

const propertyToDispatchMapper = (dispatch) => ({
    setSong: (song) => dispatch({type: 'SET_SONG', song}),
})

const ReviewCreator = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewCreator;