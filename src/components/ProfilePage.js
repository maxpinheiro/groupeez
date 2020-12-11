import React from 'react';
import {connect} from 'react-redux';
import ListenerSection from "./ListenerSection";
import {Link} from 'react-router-dom';

import userService from '../services/UserService';
import ArtistSection from "./ArtistSection";

class Profile extends React.Component {
    state = {
        user: null,
        personalPage: false,
    };

    componentDidMount() {
        //console.log(this.props.cookies.get('currentUser'));
        const userId = this.props.match.params.userId;
        if (!userId) { // logged in
            this.state.personPage = true;
            userService.getCurrentUser()
                .then(currentUser => {
                    this.state.user = currentUser;
                })
        }
        else {
            userService.getUserById(userId)
                .then(currentUser => {
                    this.state.user = currentUser;
                })
        }
    }


    render() {
        return (
            <div className="container-fluid">
                {
                    this.state.user.role === "listener" &&
                        <ListenerSection listenerId={this.state.user.id} private={this.state.personalPage}/>
                }
                {
                    this.state.currentUser.role === "artist" &&
                        <ArtistSection artistId={this.state.user.id} private={this.state.personalPage}/>
                }

            </div>
        );
    }
}

const stateToProperty = (state) => ({
    //cookies: ownProps.cookies

})

const propertyToDispatchMapper = (dispatch) => ({
})

const ProfilePage = connect(stateToProperty, propertyToDispatchMapper)(Profile);
export default ProfilePage;