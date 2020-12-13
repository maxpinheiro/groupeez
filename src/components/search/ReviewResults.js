import {Link} from "react-router-dom";
import queryString from "querystring";
import React from "react";
import {connect} from "react-redux";


class Review extends React.Component {
    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist(s)</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.reviews.map(review =>
                            <tr key={review.id}>
                                <th>
                                    <Link to={`/details/reviews/${review.id}`}>{review.title}</Link>
                                </th>
                                <th>

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
});

const propertyToDispatchMapper = (dispatch) => ({
});

const ReviewResults = connect(stateToProperty, propertyToDispatchMapper)(Review);
export default ReviewResults;