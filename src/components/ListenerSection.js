import React from 'react';
import {connect} from 'react-redux';
import ListenerService from "../services/ListenerService";
import {Link} from "react-router-dom";

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
    };

    componentDidMount() {
        const listenerId = this.props.listenerId;
        ListenerService.findListenerById(listenerId)
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


    friendName = (listenerId) => {
        ListenerService.findListenerById(listenerId)
            .then(listener => {
                console.log(listener);
                if (!listener.error) {
                    return listener.username;
                }
            });
        return "new user";
    };



    render() {
        return (
            <div className="container-fluid">

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
                        <div className={"list-group overflow-auto"}>
                            {
                                this.state.listener.favorites.map(song =>
                                    <div key={song.id}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            {song.title}
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
                        <div className={"list-group overflow-auto"}>
                            {
                                this.state.listener.reviews.map(review =>
                                    <div key={review.id}
                                         className={"list-item"}>
                                        <div className={"float-left"}>
                                            {review.title}
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
                                                {artist.name}
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
                                            <Link to={`/profile/${friendId}`}>{this.friendName(friendId)}</Link>
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