import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import userService from "../../services/UserService";
import spotifyService from "../../services/SpotifyService";
import artistService from "../../services/ArtistService";

class Artist extends React.Component {
    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        //console.log('search type: ' + searchType + ' search query: ' + searchQuery);
        if (searchQuery !== '' && searchType === 'artists') {
            this.searchArtists(searchQuery);
        }
    }

    searchArtists = (query) => {
        const queryParams = {
            q: query,
            type: "artist",
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                spotifyService.search(queryParams, accessToken).then(response => {
                    let combinedArtists = [];
                    if (response.artists) {
                        combinedArtists = combinedArtists.concat(response.artists.items);
                    }
                    artistService.queryArtist(query)
                        .then(artists => {
                            combinedArtists = combinedArtists.concat(artists);
                            console.log('artists: ' + artists);
                            this.props.setArtists(combinedArtists, query);
                        })
                });
            })
    };

    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>On Spotify?</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.artists.map(artist =>
                            <tr key={artist._id}>
                                <th>
                                    <Link to={`/profile/${artist._id}`}>{artist.name}</Link>
                                </th>
                                <th>
                                    {artist._id.length > 10 || artist.spotifyId.length > 10 ? "Yes" : "No"}
                                </th>
                                <th>
                                    Artist
                                </th>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    artist: state.searchReducer.artistResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setArtists: (artists) => dispatch({type: 'SET_ARTISTS', artists})
});

const ArtistResults = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistResults;