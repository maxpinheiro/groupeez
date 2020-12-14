import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import reviewService from "../../services/ReviewService";

class Review extends React.Component {
    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        //console.log('search type: ' + searchType + ' search query: ' + searchQuery);
        if (searchQuery !== '' && searchType === 'reviews') {
            this.searchReviews(searchQuery);
        }
    }

    searchReviews = (query) => {
        reviewService.queryReview(query)
            .then(reviews => {
                this.props.setReviews(reviews, query);
            })
    }

    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Creator</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.reviews.map(review =>
                            <tr key={review._id}>
                                <th>
                                    <Link to={`/details/reviews/${review._id}`}>{review.title}</Link>
                                </th>
                                <th>
                                    <Link to={`/profile/${review.creatorId}`}>{review.creator}</Link>
                                </th>
                                <th>
                                    Review
                                </th>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    reviews: state.searchReducer.reviewResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setReviews: (reviews) => dispatch({type: 'SET_REVIEWS', reviews})
});

const ReviewResults = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewResults;