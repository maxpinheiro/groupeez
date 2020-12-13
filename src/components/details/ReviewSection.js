import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import reviewService from '../../services/ReviewService';
import userService from '../../services/UserService';

class Review extends React.Component {
    state = {
        searchQuery: "",
        review: {
            id: "",
            creator: "",
            creatorId: "",
            songId: "",
            title: "",
            text: ""
        },
        currentUser: {id: ''},
        noReview: true
    };

    componentDidMount() {
        const detailId = this.props.detailId;
        userService.getCurrentUser()
            .then(currentUser => {
                if (!currentUser.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        currentUser
                    }))
                }
            })
        reviewService.findReviewById(detailId)
            .then(review => {
                if (!review.error) {
                    this.setState(prevState => ({
                        ...prevState,
                        review,
                        noReview: false
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        noReview: true
                    }))
                }

            });
    }

    render() {
        return (
            <div className="container-fluid">
                <span>
                    <p className="h3 d-inline mr-2">Review Details</p>
                    <Link to={`/search?${queryString.stringify({criteria: this.props.searchQuery, type: 'reviews'})}`} className="mx-2">Back to results</Link>
                    <Link to="/search" className="mx-2">Search for something else</Link>
                </span>
                {
                    !this.state.noReview &&
                    <div className="border border-2 border-secondary container-fluid mt-2">
                        <div className="m-2">
                            <div className="row">
                                <p className="h2 my-auto">
                                    {this.state.review.title}
                                </p>
                                <p className="h4 mx-4 my-auto">
                                    By
                                    <Link to={`/profile/${this.state.review.creatorId}`} className="ml-2">{this.state.review.creator}</Link>
                                </p>
                            </div>
                            <div className="row">
                                <p className="text-body my-auto">
                                    {this.state.review.text}
                                </p>
                            </div>
                            {
                                this.state.review.creatorId === this.state.currentUser.id &&
                                <Link to={`/review/edit/${this.state.review.id}`}>Edit your review</Link>
                            }
                        </div>
                    </div>
                }
                {
                    this.state.noReview &&
                    <div className="my-2">
                        <p className="d-inline">We couldn't find any review with this ID. Try a different </p>
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

const ReviewSection = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewSection;