import React from 'react';
import {connect} from 'react-redux';

class Search extends React.Component {
    state = {query: ''};

    search = () => console.log(this.state.query);

    render() {
        return (
            <div className="container-fluid">
                <div>search page</div>
                <div>{`access: ${this.props.accessToken} \n refresh: ${this.props.refreshToken}`}</div>
                <div className="input-group">
                    <input className="form-control" placeholder="query" value={this.state.query}
                            onChange={(e) => this.setState({query: e.target.value})}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={this.search}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProperty = (state) => ({
    accessToken: state.spotifyReducer.accessToken,
    refreshToken: state.spotifyReducer.refreshToken
})

const propertyToDispatchMapper = (dispatch) => ({
})

const SearchPage = connect(stateToProperty, propertyToDispatchMapper)(Search);
export default SearchPage;