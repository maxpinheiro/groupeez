import React from 'react';
import {connect} from 'react-redux';
import listenerService from "../../services/ListenerService";
import {Link} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import ArtistService from "../../services/ArtistService";
import SongService from "../../services/SongService";

class Listener extends React.Component {
    state = {
        listener: {
            id: "",
            username: "",
            name: "",
            bio: "",
            profileUrl: "",
            reviews: [{id: "", title: ""}],
            favorites: [ {id: "", title: "", artists: ""}], //should be a list of artists
            following: [ {id: "", name: ""} ],
            friends: [ {id: "", name: ""} ]
        },
        private: false,


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

    getSongTitle = (songId) => {
        SongService.findSongById(songId)
            .then(song => {
                if (!song.error) {
                    return song.title;
                }
            })
    };


    getArtistOfSong= (songId) => {
        SongService.findSongById(songId)
            .then(song => {
                if (!song.error) {
                    return song.artist;
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
                                this.state.listener.favorites.map(song =>
                                    <div key={song.id}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            <Link to={`details/songs/${song.id}`}> {song.title} </Link>
                                        </div>
                                        <div className={"float-right"}>
                                            {song.artist}
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
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"h4 m-2"}>
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
                            <div className={"h4 m-2"}>
                                Friends
                            </div>
                            <div className={"list-group"}>
                                {
                                    this.state.friends.map(friend =>
                                        <div key={friend.id}
                                             className={"list-item"}>
                                            <Link to={`/profile/${friend.id}`}>
                                                {friend.name}
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