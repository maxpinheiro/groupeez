import {Link} from "react-router-dom";
import queryString from "querystring";
import React from "react";
import {connect} from "react-redux";

class Listener extends React.Component {
    componentDidMount() {
        //console.log('Artists: ' + this.props.artists);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log('Artists: ' + this.props.artists);
    }

    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.listeners.map(listener =>
                            <tr key={listener.id}>
                                <th>
                                    <Link to={`/profile/${listener.id}`}>{listener.username}</Link>
                                </th>
                                <th>
                                    Listener
                                </th>
                                <th>
                                    {listener.name}
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

const ListenerResults = connect(stateToProperty, propertyToDispatchMapper)(Listener);
export default ListenerResults;