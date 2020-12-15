import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import userService from "../../services/UserService";
import spotifyService from "../../services/SpotifyService";

class Album extends React.Component {
    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        if (searchQuery !== '' && searchType === 'albums') {
            this.searchAlbums(searchQuery);
        }
    }

    searchAlbums = (query) => {
        const queryParams = {
            q: query,
            type: "album",
            limit: 10
        }
        userService.getAccessToken()
            .then(accessToken => {
                spotifyService.search(queryParams, accessToken).then(response => {
                    if (response.albums) {
                        this.props.setAlbums(response.albums.items, query);
                    }
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
                        <th>Title</th>
                        <th>Artist(s)</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.albums.map(album =>
                            <tr key={album.id}>
                                <th>
                                    <Link to={`/details/albums/${album.id}`}>{album.name}</Link>
                                </th>
                                <th>
                                    {
                                        album.artists.map((artist, index) => (
                                            <Link to={`/profile/${artist._id || artist.id}`} id={index}>
                                                {artist.name + (index < album.artists.length - 1 ? ', ' : '')}
                                            </Link>
                                        ))
                                    }
                                </th>
                                <th>
                                    Album
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
    albums: state.searchReducer.albumResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setAlbums: (albums) => dispatch({type: 'SET_ALBUMS', albums})
});

const AlbumResults = connect(stateToProperty, propertyToDispatchMapper)(Album);
export default AlbumResults;