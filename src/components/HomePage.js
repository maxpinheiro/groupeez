import React from "react";
import postsService from "../services/PostService";
import artistsService from "../services/ArtistService";
import {connect} from "react-redux";

import userService from '../services/UserService';
import artistService from "../services/ArtistService";
import listenerService from "../services/ListenerService";

class HomePage extends React.Component {

    state = {
        recentPosts: [],
        newArtists: [],
        loggedIn: false,
        yourFeed: [],
    };

    componentDidMount() {
        postsService.findAllPosts()
            .then(posts => {
                artistsService.findAllArtists()
                    .then(artists => {
                        let p = [];
                        let a = [];

                        for (let i = 0; i < 4; i++) {
                            if (artists.length > 0) {
                                const lastPost = posts.pop();
                                p.push(lastPost);
                            }
                        }

                        for (let i = 0; i < 4; i++) {
                            if (artists.length > 0) {
                                const lastArtist = artists.pop();
                                a.push(lastArtist);
                            }
                        }


                        userService.getCurrentUser()
                            .then(user => {
                                if (!user.error) {
                                    const feed = this.setPersonalFeed(user);
                                    this.setState((prevState) => ({
                                        ...prevState,
                                        recentPosts: p,
                                        newArtists: a,
                                        loggedIn: true,
                                        yourFeed: feed,
                                    }));
                                } else {
                                    this.setState((prevState) => ({
                                        ...prevState,
                                        recentPosts: p,
                                        newArtists: a,
                                    }));
                                }



                            });
                    });
            });
    }

    setPersonalFeed = (user) => {

        let f = [];
        if (user.role === "listener") {
            listenerService.findListenerById(user.id)
                .then(listener => {
                    if (!listener.error) {
                        for (let i = 0; i < 5; i++) {
                            if (listener.following.length > i) {
                                artistService.findArtistById(listener.following[i])
                                    .then(art => {
                                        if (!art.error) {
                                            const lastPost = art.posts.pop();
                                            if(!lastPost.error) {
                                                postsService.findPostById(lastPost)
                                                    .then(post => {
                                                        f.push(post);
                                                    });
                                            }
                                        }
                                    })
                            }
                        }

                    }
                })
        } else {
            artistService.findArtistById(user.id)
                .then(artist => {
                    for (let i = 0; i < 5; i++) {
                        if (artist.posts.length > 0) {
                            const lastPost = artist.posts.pop();
                            if(!lastPost.error) {
                                postsService.findPostById(lastPost)
                                    .then(post => {
                                        f.push(post);
                                    });
                            }
                        }
                    }
                })
        }
        return f;
    };

    render() {

        console.log(this.state.yourFeed)
        return (
            <div className={"container-fluid"}>
                <div className={"h1"}>Groupeez</div>


                <div className={"h2"}>Recent Posts:</div>
                <div className={"row-cols-sm-2"}>
                    <div className={"col"}>
                        {
                            this.state.recentPosts.map(post =>
                                <div className={"card container m-2 "}>
                                    <div className={"card-body"}>
                                        <span className={"card-title"}>
                                            <div className={"h3"}>{post.title}</div>
                                            <div className={"h4"}>{post.artist.name}</div>
                                        </span>
                                        <div className={"card-text"}>{post.text} </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className={"h2"}>New Artists on Groupeez:</div>
                <div className={"row-cols-sm-2"}>
                    <div className={"col"}>
                        {
                            this.state.newArtists.map(artist =>
                                <div className={"card container m-2 "}>
                                    <div className={"card-body"}>
                                        <div className={"card-title h3"}>
                                            {artist.name}
                                        </div>
                                        <div className={"card-text"}>{artist.bio}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    this.state.loggedIn &&
                    <div>

                        <div className={"h2"}>Your Feed:</div>
                        <div className={"row-cols-sm-2"}>
                            <div className={"col"}>
                                {
                                    this.state.yourFeed.map(post =>
                                        <div className={"card container m-2 "}>
                                            <div className={"card-body"}>
                                        <div className={"card-title"}>
                                            <div className={"h3"}>{post.title}</div>
                                        </div>
                                                <div className={"card-text"}>{post.text} </div>
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

const HomePageComponent = connect(stateToProperty, propertyToDispatchMapper)(HomePage);
export default HomePageComponent;