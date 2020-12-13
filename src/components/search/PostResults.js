import {Link} from "react-router-dom";
import queryString from "querystring";
import React from "react";
import {connect} from "react-redux";


class Post extends React.Component {
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
                        this.props.posts.map(post =>
                            <tr key={post.id}>
                                <th>
                                    <Link to={`/details/posts/${post.id}`}>{post.title}</Link>
                                </th>
                                <th>

                                </th>
                                <th>
                                    Post
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

const PostResults = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostResults;