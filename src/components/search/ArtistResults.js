import {Link} from "react-router-dom";
import queryString from "querystring";
import React from "react";
import {connect} from "react-redux";

class Artist extends React.Component {
    componentDidMount() {
        console.log('Artists: ' + this.props.artists);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Artists: ' + this.props.artists);
    }

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
                            <tr key={artist.id}>
                                <th>
                                    <Link to={`/profile/${artist.id}`}>{artist.name}</Link>
                                </th>
                                <th>
                                    {artist.id.length > 10 || artist.spotifyId.length > 10 ? "Yes" : "No"}
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
    artist: state.spotifyReducer.artists
});

const propertyToDispatchMapper = (dispatch) => ({
});

const ArtistResults = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistResults;