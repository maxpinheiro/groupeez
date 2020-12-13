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
        listener: {
            id: "",
            username: "",
            name: "",
            bio: "",
            profileUrl: "",
            reviews: [],
            favorites: [],
            following: [],
            friends: []
        },
        private: false,


    };

    componentDidMount() {
        const listenerId = this.props.listenerId;
        listenerService.findListenerById(listenerId)
            .then(listener => {
                if (!listener.error) {
                    this.populateListener(listener);
                }
            })


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
        if (songId.length === 10) return songService.findSongById(songId);
        return spotifyService.findSong(songId, this.state.accessToken);
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
                                        console.log({
                                            ...listener,
                                            reviews,
                                            following,
                                            friends,
                                            favorites
                                        });
                                        this.setState(prevState => ({
                                            ...prevState,
                                            listener: {
                                                ...listener,
                                                reviews,
                                                following,
                                                friends,
                                                favorites
                                            }
                                        }))
                                    })
                            })
                    })
            })
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">

                <div className={"h1"}>
                    {this.state.listener.name}
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div style={{width: 100, height: 100}}>
                            <img src={this.state.listener.profileUrl} alt={"img"} className={"img-thumbnail"} />
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"boarder m-2"}>
                            <div className={"h4"}>Bio</div>
                            {this.state.listener.bio}
                        </div>
                    </div>
                </div>
                <div className={"row my-3"}>
                    <div className={"col-6"}>
                        <div className={"h4"}>
                            Favorites
                        </div>
                        <div className={"list-group overflow-auto boarder"}>
                            {
                                this.state.listener.favorites.map(song =>
                                    <div key={song.id} className={"list-item"}>
                                        <Link to={`/details/songs/${song.id}`} className="d-inline"> {song.title || song.name} </Link>
                                        <div className={"ml-1 d-inline"}>
                                            by <Link to={`/profile/${song.artists[0].id || song.artistIds[0]}`} className="d-inline"> {song.artists[0].name || song.artists[0]} </Link>
                                        </div>
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
                                this.state.listener.reviews.map(review =>
                                    <div key={review.id}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            <Link to={`/details/reviews/${review.id}`}> {review.title} </Link>
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
                                    this.state.listener.following.map(artist =>
                                        <div key={artist.id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/profile/${artist.id}`}>
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
                                    this.state.listener.friends.map(friend =>
                                        <div key={friend.id}
                                             className={"list-item"}>
                                            <Link to={`/profile/${friend.id}`}>
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
})

const propertyToDispatchMapper = (dispatch) => ({

})

const ListenerSection = connect(stateToProperty, propertyToDispatchMapper)(Listener);
export default ListenerSection;