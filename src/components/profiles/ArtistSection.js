import React from 'react';
import {connect} from 'react-redux';
import ArtistService from "../../services/ArtistService";
import ListenerService from "../../services/ListenerService";

class Artist extends React.Component {
    state = {
        artist:{
                id: "",
                username: "",
                name: "",
                profileId: "",
                spotifyId: "",
                bio: "",
                library: [],
                reviews: [],
                posts: [],
                followers: []
            },
        reviews: [],
        songs: []

    };

    componentDidMount() {
        const artistId = this.props.artistId;
        ArtistService.findArtistById(artistId)
            .then(artist => {
                if (!artist.error) {
                    this.setState(function(prevState){
                        return {
                            ...prevState,
                            artist: artist,
                        }
                    })
                }
            })
    };

    followerName = (listenerId) => {
        ListenerService.findListenerById(listenerId)
            .then(listener => {
                if (!listener.error) {
                    return listener.username;
                }
            });
        return "";
    };


    render() {
        return (
            <div className="container-fluid">

                <div className={"h1"}>
                    {this.state.artist.name}
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div style={{width: 100, height: 100}}>
                            <img src={this.state.artist.profileUrl} alt={"img"} className={"img-thumbnail"} />
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"boarder m-2"}>
                            <div className={"h4"}>Bio</div>
                            {this.state.artist.bio}
                        </div>
                    </div>
                </div>

                <div className={"row boarder"}>
                    <div className={"h4 m-2"}>
                        Posts
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.artist.posts.map(post =>
                                <div key={post.id}
                                     className={"list-item"}>
                                    <div className={"h5"}>
                                        {post.type}
                                    </div>
                                    <div className={"h6"}>
                                        {post.messege}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"row m-2 boarder"}>
                    <div className={"h4 m-2"}>
                        Library
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.songs.map(song =>
                                <div key={song.id}
                                     className={"list-item"}>
                                    <div className={"float-left"}>
                                        {song.title}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"row m-2 boarder"}>
                    <div className={"h4 m-2"}>
                        Reviews
                    </div>
                    <div className={"list-group overflow-auto"}>
                        {
                            this.state.reviews.map(review =>
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
                {
                    this.props.private &&
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"h4 m-2"}>
                                Following
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.artist.followers.map(listenerId =>
                                        <div key={listenerId}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                {this.followerName(listenerId)}
                                            </div>
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
    //cookies: ownProps.cookies

})

const propertyToDispatchMapper = (dispatch) => ({
})

const ArtistSection = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistSection;