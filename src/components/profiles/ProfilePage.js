import React from 'react';
import {connect} from 'react-redux';
import ListenerSection from "./ListenerSection";
import {Link} from 'react-router-dom';

import userService from '../../services/UserService';
import ArtistSection from "./ArtistSection";
import artistService from "../../services/ArtistService";

class Profile extends React.Component {
    state = {
        error: ""
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;

        if (!userId) { // '/profile'
            userService.getCurrentUser().then(currentUser => {
                if (!currentUser.error) { // logged in
                    this.props.setProfile(currentUser.role, currentUser._id, true);
                } else { // not logged in: error
                    this.setState(prevState => ({
                        ...prevState,
                        error: "You must be logged in to view this page."
                    }));
                }
            })
        } else if (userId.length === 24) { // '/profile/localId'
            userService.getUserById(userId).then(user => {
                if (!user.error) { // user exists for id
                    userService.getCurrentUser().then(currentUser => {
                        if (!currentUser.error && currentUser._id === userId) { // viewing on profile -> redirect
                            this.props.history.push('/profile');
                        } else { // viewing different profile
                            this.props.setProfile(user.role, user._id, false);
                        }
                    })

                } else { // no user with id
                    this.setState(prevState => ({
                        ...prevState,
                        error: "We can't find a user with this ID."
                    }));
                }
            })
        } else if (userId.length === 22) { // '/profile/spotifyId'
            artistService.findArtistBySpotifyId(userId).then(artist => {
                if (!artist.error) { // spotify artist has account -> redirect
                    this.props.history.push(`/profile/${artist._id}`);
                } else { // spotify artist doesnt have account
                    this.setState(prevState => ({
                        ...prevState,
                        error: "Groupeez does not provide profile pages for Spotify artists."
                    }));
                }
            })
        } else { // no user with id
            this.setState(prevState => ({
                ...prevState,
                error: "We can't find a user with this ID."
            }));
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        const userId = this.props.match.params.userId;

        if (!userId && (!prevProps.match.params.userId || prevProps.match.params.userId !== '')) { // '/profile' from '/profile/Id'
            userService.getCurrentUser().then(currentUser => {
                if (!currentUser.error) { // logged in
                    this.props.setProfile(currentUser.role, currentUser._id, true);
                } else { // not logged in: error
                    this.setState(prevState => ({
                        ...prevState,
                        error: "You must be logged in to view this page."
                    }));
                }
            })
        } else if (userId && userId.length === 24 && prevProps.match.params.userId !== userId) { // '/profile/localId'
            userService.getUserById(userId).then(user => {
                if (!user.error) { // user exists for id
                    userService.getCurrentUser().then(currentUser => {
                        if (!currentUser.error && currentUser._id === userId) { // viewing on profile -> redirect
                            this.props.history.push('/profile');
                        } else { // viewing different profile
                            this.props.setProfile(user.role, user._id, false);
                        }
                    })

                } else { // no user with id
                    this.setState(prevState => ({
                        ...prevState,
                        error: "We can't find a user with this ID."
                    }));
                }
            })
        } else if (userId && userId.length === 22 && prevProps.match.params.userId !== userId) { // '/profile/spotifyId'
            artistService.findArtistBySpotifyId(userId).then(artist => {
                if (!artist.error) { // spotify artist has account -> redirect
                    this.props.history.push(`/profile/${artist._id}`);
                } else { // spotify artist doesnt have account
                    this.setState(prevState => ({
                        ...prevState,
                        error: "Groupeez does not provide profile pages for Spotify artists."
                    }));
                }
            })
        } else if (userId && userId.length !== 22 && userId.length !== 24) { // no user with id
            this.setState(prevState => ({
                ...prevState,
                error: "We can't find a user with this ID."
            }));
        }

    }

    render() {
        return (
            <div className="container-fluid">
                {
                    this.props.profileType === "listener" &&
                        <ListenerSection listenerId={this.props.profileId} private={this.props.personalPage}/>
                }
                {
                    this.props.profileType === "artist" &&
                        <ArtistSection artistId={this.props.profileId} private={this.props.personalPage}/>
                }
                {
                    this.state.error !== "" &&
                    <div>
                        <p>{this.state.error}</p>
                        {this.state.error === "You must be logged in to view this page." && <Link to="/login">Login</Link>}
                    </div>
                }
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    profileType: state.profileReducer.profileType,
    profileId: state.profileReducer.profileId,
    personalPage: state.profileReducer.personalPage,
})

const propertyToDispatchMapper = (dispatch) => ({
    setProfile: (profileType, profileId, personalPage) => dispatch({type: "SET_PROFILE", profileType, profileId, personalPage})
})

const ProfilePage = connect(stateToProperty, propertyToDispatchMapper)(Profile);
export default ProfilePage;