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
        error: ""
    };

    componentDidMount() {
        //console.log(this.props.cookies.get('currentUser'));

        const userId = this.props.match.params.userId;
        console.log('mount ' + userId);
        if (!userId) { // personal profile path - viewing own page
            userService.getCurrentUser()
                .then(currentUser => {
                    if (currentUser.error) {
                        this.setState( function(prevState) {
                            return {
                                ...prevState,
                                error: currentUser.error,
                                user: null,
                                personalPage: true,
                            }
                        })
                    } else {
                        this.setState( function(prevState) {
                            return {
                                ...prevState,
                                user: currentUser,
                                personalPage: true,
                            }
                        })
                    }
                })
        }
        else {
            userService.getUserById(userId)
                .then(currentUser => {
                    if(!currentUser.error) {
                        this.setState( function(prevState) {
                            return {
                                ...prevState,
                                user: currentUser
                            }
                        })
                    }
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        const userId = this.props.match.params.userId;
    }


    render() {
        return (
            <div className="container-fluid">
                {
                    this.state.user && this.state.user.role === "listener" &&
                        <ListenerSection listenerId={this.state.user.id} private={this.state.personalPage}/>
                }
                {
                    this.state.user && this.state.user.role === "artist" &&
                        <ArtistSection artistId={this.state.user.id} private={this.state.personalPage}/>
                }
                {
                    !this.state.user && this.state.personalPage &&
                    <div>
                        <p>You must be logged in to access this page.</p>
                        <Link to="/login">Login</Link>
                    </div>

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