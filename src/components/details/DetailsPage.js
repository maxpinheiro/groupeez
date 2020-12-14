import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import userService from '../../services/UserService';
import SongSection from "./SongSection";
import queryString from "querystring";
import AlbumSection from "./AlbumSection";
import ReviewSection from "./ReviewSection";
import PostSection from "./PostSection";

class Details extends React.Component {
    state = {

    };

    componentDidMount() {
        const detailType = this.props.match.params.detailType;
        const detailId = this.props.match.params.detailId;
        this.props.setDetails(detailType, detailId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const detailType = this.props.match.params.detailType;
        const detailId = this.props.match.params.detailId;
        if (detailId !== prevState.detailId) {
            this.props.setDetails(detailType, detailId);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {
                    this.props.detailType === "songs" &&
                    <SongSection detailId={this.props.detailId} />
                }
                {
                    this.props.detailType === "albums" &&
                    <AlbumSection detailId={this.props.detailId} />
                }
                {
                    this.props.detailType === "reviews" &&
                    <ReviewSection detailId={this.props.detailId} />
                }
                {
                    this.props.detailType === "posts" &&
                    <PostSection detailId={this.props.detailId} />
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    detailType: state.detailsReducer.detailType,
    detailId: state.detailsReducer.detailId
})

const propertyToDispatchMapper = (dispatch) => ({
    setDetails: (detailType, detailId) => dispatch({type: "SET_DETAILS", detailType, detailId})
})

const DetailsPage = connect(stateToProperty, propertyToDispatchMapper)(Details);
export default DetailsPage;