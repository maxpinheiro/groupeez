import {Link} from "react-router-dom";
import queryString from "querystring";
import React from "react";
import {connect} from "react-redux";


export default class SongResults extends React.Component {
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
                        this.props.songs.map(song =>
                            <tr key={song.id}>
                                <th>
                                    <Link to={`/details/songs/${song.id}?${queryString.stringify({spotify: true})}`}>{song.name}</Link>
                                </th>
                                <th>
                                    {
                                        song.artists.map((artist, index) => (
                                            <Link to={`/profile/${artist.id}`}>
                                                {artist.name + (index < song.artists.length - 1 ? ', ' : '')}
                                            </Link>
                                        ))
                                    }
                                </th>
                                <th>
                                    Song
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

