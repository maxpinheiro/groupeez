import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from "querystring";

import reviewService from '../../services/ReviewService';
import userService from '../../services/UserService';

class Review extends React.Component {
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

        reviewService.findReviewById(detailId).then(review => {
            if (!review.error) {
               this.props.setReview(review);
            } else { // can't find review with id
                this.setState(prevState => ({
                    ...prevState,
                    error: 'Cannot find review with id.'
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
                    this.props.review._id !== '' &&
                    <div className="border border-2 border-secondary container-fluid mt-2">
                        <div className="m-2">
                            <div className="row">
                                <p className="h2 my-auto">
                                    {this.props.review.title}
                                </p>
                                <p className="h4 mx-4 my-auto">
                                    By
                                    <Link to={`/profile/${this.props.review.creatorId}`} className="ml-2">{this.props.review.creator}</Link>
                                </p>
                            </div>
                            <div className="row">
                                <p className="text-body my-auto">
                                    {this.props.review.text}
                                </p>
                            </div>
                            {
                                this.props.review.creatorId === this.state.currentUser &&
                                <Link to={`/reviews/edit/${this.props.review._id}`}>Edit your review</Link>
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
    review: state.detailsReducer.review
})

const propertyToDispatchMapper = (dispatch) => ({
    setReview: (review) => dispatch({type: 'SET_REVIEW', review})
})

const ReviewSection = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewSection;