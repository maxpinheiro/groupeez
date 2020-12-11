import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import userService from '../services/UserService';

class Profile extends React.Component {
    state = {
    };

    componentDidMount() {
        //console.log(this.props.cookies.get('currentUser'));
        const userId = this.props.match.params.userId;
        if (!userId) { // logged in
            userService.getCurrentUser()
                .then(currentUser => {

                })
        }
    }


    render() {
        return (
            <div className="container-fluid">

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