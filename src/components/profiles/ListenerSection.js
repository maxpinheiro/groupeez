import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import reviewService from "../../services/ReviewService";
import artistService from "../../services/ArtistService";
import listenerService from "../../services/ListenerService";
import songService from "../../services/SongService";
import spotifyService from "../../services/SpotifyService";

class Listener extends React.Component {
    state = {
        editing: false,
        bio: "",
    };

    componentDidMount() {
        const listenerId = this.props.listenerId;
        listenerService.findListenerById(listenerId)
            .then(listener => {
                if (!listener.error) {
                    this.populateListener(listener);
                }
            })

        this.setState((prevProps) =>
            ({...prevProps, bio: this.props.listener.bio}));

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const listenerId = this.props.listenerId;
        if (listenerId !== prevProps.listenerId) {
            listenerService.findListenerById(listenerId)
                .then(listener => {
                    if (!listener.error) {
                        //console.log(listener);
                        this.populateListener(listener);
                    }
                })
        }
    }

    findReviews = (reviewIds) => Promise.all(reviewIds.map(reviewId => reviewService.findReviewById(reviewId)));

    findArtists = (artistIds) => Promise.all(artistIds.map(artistId => artistService.findArtistById(artistId)));

    findSongs = (songIds) => Promise.all(songIds.map(songId => {
        if (songId.length === 24) return songService.findSongById(songId);
        return spotifyService.findSong(songId, this.props.accessToken);
    }));

    findGroupeez = (groupeeIds) => Promise.all(groupeeIds.map(groupeeId => listenerService.findListenerById(groupeeId)));

    populateListener = (listener) => {
        this.findReviews(listener.reviews)
            .then(reviews => {
                this.findArtists(listener.following)
                    .then(following => {
                        this.findGroupeez(listener.friends)
                            .then(friends => {
                                this.findSongs(listener.favorites)
                                    .then(favorites => {
                                        this.props.setListener({
                                            ...listener,
                                            reviews,
                                            following,
                                            friends,
                                            favorites
                                        })
                                    })
                            })
                    })
            })
    };

    saveListenerBio = () => {
        let copy = this.props.listener;
        copy.bio = this.state.bio;
        listenerService.updateListener(this.props.listener._id, copy).then(status => {
            this.setState((prevState) => ({
                ...prevState,
                editing: false,
            }))
        });
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">

                <div className={"h1"}>
                    {this.props.listener.name}
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div style={{width: 100, height: 100}}>
                            <img src={this.props.listener.profileUrl} alt={"img"} className={"img-thumbnail"} />
                        </div>
                    </div>
                    <div className={"col-6"}>
                        {
                            !this.state.editing &&
                            <div className={"border"}>
                                <div className="m-2">
                                    <div className={"h4"}>Bio</div>
                                    {this.props.listener.bio}
                                    {
                                        this.props.private &&
                                        <div className={"btn btn-warning ml-4"}
                                             onClick={e => this.setState((prevProps) =>
                                                 ({...prevProps, editing: true, bio: this.props.listener.bio}))}>
                                            Edit
                                        </div>
                                    }
                                </div>

                            </div>
                        }
                        {
                            this.props.private && this.state.editing &&
                                <div className={"border"}>
                                    <div className="m-2">
                                        <div className={"h4"}>Editing Bio</div>
                                        <textarea value={this.state.bio} onChange={e => this.setState((prevProps) =>
                                            ({...prevProps, bio: e.target.value}))}/>
                                        <div className={"btn btn-success ml-4"}
                                             onClick={this.saveListenerBio}>
                                            Save
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={"row my-3"}>
                    <div className={"col-6"}>
                        <div className={"h4"}>
                            Favorites
                        </div>
                        <div className={"list-group overflow-auto boarder"}>
                            {
                                this.props.listener.favorites.map(song =>
                                    <div key={song._id ? song._id : song.id} className={"list-item"}>
                                        {
                                            song._id && !song.error &&
                                            <div>
                                                <Link to={`/details/songs/${song._id}`} className="d-inline"> {song.title} </Link>
                                                <div className={"ml-1 d-inline"}>
                                                    by <Link to={`/profile/${song.artistIds[0]}`} className="d-inline"> {song.artists[0]} </Link>
                                                </div>
                                            </div>
                                        }
                                        {
                                            !song._id && !song.error &&
                                            <div>
                                                <Link to={`/details/songs/${song.id}`} className="d-inline"> {song.name} </Link>
                                                <div className={"ml-1 d-inline"}>
                                                    by <Link to={`/profile/${song.artists[0].id}`} className="d-inline"> {song.artists[0].name} </Link>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"h4"}>
                            Reviews
                        </div>
                        <div className={"list-group overflow-auto boarder"}>
                            {
                                this.props.listener.reviews.map(review =>
                                    <div key={review._id}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            <Link to={`/details/reviews/${review._id}`}> {review.title} </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    this.props.private &&
                    <div className={"row my-3"}>
                        <div className={"col-6"}>
                            <div className={"h4"}>
                                Following
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.props.listener.following.map(artist =>
                                        <div key={artist._id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/profile/${artist._id}`}>
                                                    {artist.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className={"h4"}>
                                Friends
                            </div>
                            <div className={"list-group"}>
                                {
                                    this.props.listener.friends.map(friend =>
                                        <div key={friend._id}
                                             className={"list-item"}>
                                            <Link to={`/profile/${friend._id}`}>
                                                {friend.username}
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    listener: state.profileReducer.listener
})

const propertyToDispatchMapper = (dispatch) => ({
    setListener: (listener) => dispatch({type: "SET_LISTENER", listener})
})

const ListenerSection = connect(stateToProperty, propertyToDispatchMapper)(Listener);
export default ListenerSection;