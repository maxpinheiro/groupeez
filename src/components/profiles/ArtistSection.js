import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import userService from '../../services/UserService';
import spotifyService from '../../services/SpotifyService';
import reviewService from "../../services/ReviewService";
import postService from "../../services/PostService";
import artistService from "../../services/ArtistService";
import listenerService from "../../services/ListenerService";
import songService from "../../services/SongService";

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
        accessToken: ''
    };

    componentDidMount() {
        const artistId = this.props.artistId;
        userService.getAccessToken()
            .then(accessToken => this.setState(prevState => ({
                ...prevState,
                accessToken
            })));
        if (artistId.length > 10) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {

                    }
                })
        } else {
            artistService.findArtistById(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.populateArtist(artist);
                    }
                })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const artistId = this.props.artistId;
        if (artistId.length > 10) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist.id}`);
                    } else {
                        // search spotify API
                        /*
                        spotifyService.findArtist(artistId)
                            .then(artist => {

                            })
                        */
                    }
                })
        } else if (artistId !== prevProps.artistId) {
            artistService.findArtistById(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.populateArtist(artist);
                    }
                })
        }
    }

    findReviews = (reviewIds) => Promise.all(reviewIds.map(reviewId => reviewService.findReviewById(reviewId)));

    findPosts = (postIds) => Promise.all(postIds.map(postId => postService.findPostById(postId)));

    findSongs = (songIds) => Promise.all(songIds.map(songId => {
        if (songId.length === 10) return songService.findSongById(songId);
        return spotifyService.findSong(songId, this.state.accessToken);
    }));

    findGroupeez = (groupeeIds) => Promise.all(groupeeIds.map(groupeeId => listenerService.findListenerById(groupeeId)));

    populateArtist = (artist) => {
        this.findReviews(artist.reviews)
            .then(reviews => {
                this.findPosts(artist.posts)
                    .then(posts => {
                        this.findGroupeez(artist.groupeez)
                            .then(followers => {
                                this.findSongs(artist.library)
                                    .then(library => this.setState(prevState => ({
                                        ...prevState,
                                        artist: {
                                            ...artist,
                                            reviews,
                                            posts,
                                            followers,
                                            library
                                        }
                                    })))
                            })
                    })
            })
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">
                <div className="m-2">
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
                            <div className={"border"}>
                                <div className="m-2">
                                    <div className={"h4"}>Bio</div>
                                    {this.state.artist.bio}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border mt-3">
                        <div className="m-2">
                            <div className="h4">
                                Posts
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.artist.posts.map(post =>
                                        <div key={post.id}
                                             className={"list-item"}>
                                            <div className={"float-left h6"}>
                                                <Link to={`/details/posts/${post.id}`}>
                                                    {post.title}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={"h4"}>
                                Library
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.artist.library.map(song =>
                                        <div key={song.id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/details/songs/${song.id}`}>
                                                    {song.title || song.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={"h4"}>
                                Reviews
                            </div>
                            <div className={"list-group overflow-auto"}>
                                {
                                    this.state.artist.reviews.map(review =>
                                        <div key={review.id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/details/reviews/${review.id}`}>
                                                    {review.title}
                                                </Link>
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
                                <div className={"list-group overflow-auto ml-2"}>
                                    {
                                        this.state.artist.followers.map(groupee =>
                                            <div key={groupee.id} className=""
                                                 className={"list-item"}>
                                                <div className={"float-left"}>
                                                    <Link to={`/profile/${groupee.id}`}>
                                                        {groupee.username}
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-6">
                                <Link to="/post">Create a Post</Link>
                            </div>
                        </div>
                    }
                </div>
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