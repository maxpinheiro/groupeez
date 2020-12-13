import React from 'react';
import {connect} from 'react-redux';
import listenerService from "../../services/ListenerService";
import {Link} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import ArtistService from "../../services/ArtistService";

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
        private: false
    };

    componentDidMount() {
        const listenerId = this.props.listenerId;
        listenerService.findListenerById(listenerId)
            .then(listener => {
                if (!listener.error) {
                    this.setState(function(prevState){
                        return {
                            ...prevState,
                            listener: listener,
                        }
                    })
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
                        this.setState(function(prevState){
                            return {
                                ...prevState,
                                listener: listener,
                            }
                        })
                    }
                })
        }
    }


    friendName = (listenerId) => {
        listenerService.findListenerById(listenerId)
            .then(listener => {
                if (!listener.error) {
                    return listener.username;
                }
            });
        return "new user";
    };

    reviewTitle = (reviewId) => {
        ReviewService.findReviewById(reviewId)
            .then(review => {
                if (!review.error) {
                    return review.title;
                }
            });
        return "new user";
    };

    artistName = (artistId) => {
        ArtistService.findArtistById(artistId)
            .then(artist => {
                if (!artist.error) {
                    return artist.name;
                }
            })
    };

    getSong = (songId) => {
        SongService.findSongById(songId)
            .then(song => {
                if (!song.error) {
                    return song;
                }
            })
    };




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
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"h4 m-2"}>
                            Favorites
                        </div>
                        <div className={"list-group overflow-auto boarder"}>
                            {
                                this.state.listener.favorites.map(songId =>
                                    <div key={songId}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            <Link to={`details/songs/${songId}`}> {this.getSong(songId).title} </Link>
                                        </div>
                                        <div className={"float-right"}>
                                            {this.getSong(songId).artist}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"h4 m-2"}>
                            Reviews
                        </div>
                        <div className={"list-group overflow-auto boarder"}>
                            {
                                this.state.listener.reviews.map(reviewId =>
                                    <div key={reviewId}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            <Link to={`/details/reviews/${reviewId}`}> {this.reviewTitle(reviewId)} </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    this.props.private &&
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"h4 m-2"}>
                                Following
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.listener.following.map(artistId =>
                                        <div key={artistId}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/profile/${artistId}`}>
                                                    {this.artistName(artistId)}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className={"h4 m-2"}>
                                Friends
                            </div>
                            <div className={"list-group"}>
                                {
                                    this.state.listener.friends.map(friendId =>
                                        <div key={friendId}
                                             className={"list-item"}>
                                            <Link to={`/profile/${friendId}`}>
                                                {this.friendName(friendId)}
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