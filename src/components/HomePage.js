import React from "react";
import postsService from "../services/PostService";
import artistsService from "../services/ArtistService";
import {connect} from "react-redux";

import userService from '../services/UserService';
import artistService from "../services/ArtistService";
import listenerService from "../services/ListenerService";
import {Link} from "react-router-dom";

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
                                    this.setPersonalFeed(user, p, a);
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

    setPersonalFeed = (user, p, a) => {
        let f = [];
        if (user.role === "listener") {
            listenerService.findListenerById(user._id)
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
                                                        this.setState((prevState) => ({
                                                            ...prevState,
                                                            recentPosts: p,
                                                            newArtists: a,
                                                            loggedIn: true,
                                                            yourFeed: f,
                                                        }));
                                                    });
                                            }
                                        }
                                    })
                            }
                        }

                    }
                })
        } else {
            artistService.findArtistById(user._id)
                .then(artist => {
                    for (let i = 0; i < 5; i++) {
                        if (artist.posts.length > 0) {
                            const lastPost = artist.posts.pop();
                            if(!lastPost.error) {
                                postsService.findPostById(lastPost)
                                    .then(post => {
                                        f.push(post);
                                        this.setState((prevState) => ({
                                            ...prevState,
                                            recentPosts: p,
                                            newArtists: a,
                                            loggedIn: true,
                                            yourFeed: f,
                                        }));
                                    });
                            }
                        }
                    }
                })
        }
    };

    render() {

        console.log(this.state.yourFeed)
        return (
            <div className={"container-fluid"}>
                <span>
                    <div className="h1 d-inline">Groupeez</div>
                    <Link to="/login" className="ml-3 mr-1">Login</Link>
                    <Link to="/authorize/search" className="mx-2">Search</Link>
                </span>

                <div className={"h2"}>Recent Posts:</div>
                <div className={"row-cols-sm-2"}>
                    <div className={"col"}>
                        {
                            this.state.recentPosts.map(post =>
                                <div key={post._id} className={"card container m-2 "}>
                                    <div className={"card-body"}>
                                        <span className={"card-title"}>
                                            <Link to={`/details/posts/${post._id}`}>
                                                <div className={"h3"}>{post.title}</div>
                                            </Link>
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
                                        <Link to={`/profile/${artist._id}`}>
                                            <div className={"card-title h3"}>
                                                {artist.name}
                                            </div>
                                        </Link>
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
                                        <div key={post._id} className={"card container m-2 "}>
                                            <div className={"card-body"}>
                                                <div className={"card-title"}>
                                                    <Link to={`/details/posts/${post._id}`}>
                                                        <div className={"h3"}>{post.title}</div>
                                                    </Link>
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