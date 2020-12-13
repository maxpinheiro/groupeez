import React from 'react';
import {connect} from 'react-redux';
import ListenerSection from "./ListenerSection";
import {Link} from 'react-router-dom';

import spotifyService from '../../services/SpotifyService';
import userService from '../../services/UserService';
import ArtistSection from "./ArtistSection";
import artistService from "../../services/ArtistService";

class Profile extends React.Component {
    state = {
        user: null,
        personalPage: false,
        error: ""
    };

    componentDidMount() {
        //console.log(this.props.cookies.get('currentUser'));

        const userId = this.props.match.params.userId;
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
        else if (userId.length > 10) {
            artistService.findArtistBySpotifyId(userId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {
                        // search spotify API
                    }
                })
        } else {
            userService.getUserById(userId)
                .then(user => {
                    if (!user.error) {
                        userService.getCurrentUser()
                            .then(currentUser => {
                                if (!currentUser.error && currentUser.id === user.id) {
                                    this.props.history.push('/profile');
                                } else {
                                    this.setState( function(prevState) {
                                        return {
                                            ...prevState,
                                            user
                                        }
                                    })
                                }
                            })

                    }
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        const userId = this.props.match.params.userId;
        if (!userId && prevProps.match.params.userId) { // personal profile path - viewing own page
            //console.log('get current')
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
        else if (userId && userId.length > 10) {
            //console.log('get spotify')
            artistService.findArtistBySpotifyId(userId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {
                        // search spotify API
                    }
                })
        } else if (!prevState.user || (userId && userId !== prevState.user.id)) {
            //console.log('get local')
            userService.getUserById(userId)
                .then(user => {
                    if (!user.error) {
                        this.setState( function(prevState) {
                            return {
                                ...prevState,
                                personalPage: false,
                                user: user
                            }
                        })
                    }
                })
        }
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