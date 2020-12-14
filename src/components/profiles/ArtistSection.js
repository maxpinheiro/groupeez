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
        error: ''
    };

    componentDidMount() {
        const artistId = this.props.artistId;
        console.log('artistid: ' + artistId);
        if (artistId.length === 22) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) { // artist has account
                        this.props.history.push(`/profile/${artist._id}`);
                    } else { // spotify artist doesnt have account
                        this.setState(prevState => ({
                            ...prevState,
                            error: "Groupeez does not provide profile pages for Spotify artists."
                        }));
                    }
                })
        } else if (artistId.length === 24) {
            artistService.findArtistById(artistId)
                .then(artist => {
                    if (!artist.error) { // found artist w id
                        this.populateArtist(artist);
                    } else { // no artist with id
                        this.setState(prevState => ({
                            ...prevState,
                            error: "We can't find a user with this ID."
                        }));
                    }
                })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const artistId = this.props.artistId;
        if (artistId.length === 22) { // spotifyArtist
            artistService.findArtistBySpotifyId(artistId)
                .then(artist => {
                    if (!artist.error) {
                        this.props.history.push(`/profile/${artist._id}`);
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
        if (songId.length === 24) return songService.findSongById(songId);
        return spotifyService.findSong(songId, this.state.accessToken);
    }));

    findGroupeez = (groupeeIds) => Promise.all(groupeeIds.map(groupeeId => listenerService.findListenerById(groupeeId)));

    populateArtist = (artist) => {
        this.findReviews(artist.reviews)
            .then(reviews => {
                this.findPosts(artist.posts)
                    .then(posts => {
                        this.findGroupeez(artist.groupeez)
                            .then(groupeez => {
                                this.findSongs(artist.library)
                                    .then(library => this.props.setArtist({
                                        ...artist,
                                        reviews,
                                        posts,
                                        groupeez,
                                        library
                                    }))
                            })
                    })
            })
    }

    render() {
        return (
            <div className="container-fluid border border-2 border-secondary">
                <div className="m-2">
                    <div className={"h1"}>
                        {this.props.artist.name}
                    </div>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div style={{width: 100, height: 100}}>
                                <img src={this.props.artist.profileUrl} alt={"img"} className={"img-thumbnail"} />
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className={"border"}>
                                <div className="m-2">
                                    <div className={"h4"}>Bio</div>
                                    {this.props.artist.bio}
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
                                    this.props.artist.posts.map(post =>
                                        <div key={post._id}
                                             className={"list-item"}>
                                            <div className={"float-left h6"}>
                                                <Link to={`/details/posts/${post._id}`}>
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
                                    this.props.artist.library.map(song =>
                                        <div key={song._id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/details/songs/${song._id}`}>
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
                                    this.props.artist.reviews.map(review =>
                                        <div key={review._id}
                                             className={"list-item"}>
                                            <div className={"float-left"}>
                                                <Link to={`/details/reviews/${review._id}`}>
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
                                    Followers
                                </div>
                                <div className={"list-group overflow-auto ml-2"}>
                                    {
                                        this.props.artist.groupeez.map(groupee =>
                                            <div key={groupee._id} className=""
                                                 className={"list-item"}>
                                                <div className={"float-left"}>
                                                    <Link to={`/profile/${groupee._id}`}>
                                                        {groupee.username}
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-6">
                                <Link to="/posts/create">Create a Post</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    artist: state.profileReducer.artist
})

const propertyToDispatchMapper = (dispatch) => ({
    setArtist: (artist) => dispatch({type: "SET_ARTIST", artist})
})

const ArtistSection = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistSection;