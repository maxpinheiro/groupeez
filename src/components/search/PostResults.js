import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import postService from "../../services/PostService";

class Post extends React.Component {
    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        //console.log('search type: ' + searchType + ' search query: ' + searchQuery);
        if (searchQuery !== '' && searchType === 'posts') {
            this.searchPosts(searchQuery);
        }
    }

    searchPosts = (query) => {
        postService.queryPost(query)
            .then(posts => {
                this.props.setPosts(posts, query);
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
                        <th>Artist</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.posts.map(post =>
                            <tr key={post._id}>
                                <th>
                                    <Link to={`/details/posts/${post._id}`}>{post.title}</Link>
                                </th>
                                <th>
                                    <Link to={`/profile/${post.artistId}`}>{post.artist}</Link>
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
    posts: state.searchReducer.postResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setPosts: (posts) => dispatch({type: 'SET_POSTS', posts})
});

const PostResults = connect(stateToProperty, propertyToDispatchMapper)(Post);
export default PostResults;