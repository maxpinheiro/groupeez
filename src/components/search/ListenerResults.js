import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

import listenerService from "../../services/ListenerService";

class Listener extends React.Component {
    componentDidMount() {
        const searchType = this.props.searchType;
        const searchQuery = this.props.searchQuery;
        //console.log('search type: ' + searchType + ' search query: ' + searchQuery);
        if (searchQuery !== '' && searchType === 'listeners') {
            this.searchGroupeez(searchQuery);
        }
    }

    searchGroupeez = (query) => {
        listenerService.queryListener(query)
            .then(listeners => {
                this.props.setListeners(listeners, query);
            })
    }

    render() {
        return (

            <div className="my-3">
                <h4>Results</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.listeners.map(listener =>
                            <tr key={listener._id}>
                                <th>
                                    <Link to={`/profile/${listener._id}`}>{listener.username}</Link>
                                </th>
                                <th>
                                    {listener.name}
                                </th>
                                <th>
                                    Listener
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
    listeners: state.searchReducer.listenerResults,
    searchType: state.searchReducer.searchType,
    searchQuery: state.searchReducer.searchQuery
});

const propertyToDispatchMapper = (dispatch) => ({
    setListeners: (listeners) => dispatch({type: 'SET_LISTENERS', listeners})
});

const ListenerResults = connect(stateToProperty, propertyToDispatchMapper)(Listener);
export default ListenerResults;