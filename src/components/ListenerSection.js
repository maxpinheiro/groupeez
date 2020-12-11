import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Listener extends React.Component {
    state = {
    };

    componentDidMount() {
        const artistId = this.props.artistId;
    }


    render() {
        return (
            <div className="container-fluid">

            </div>
        );
    }
}

const stateToProperty = (state) => ({
    //cookies: ownProps.cookies

})

const propertyToDispatchMapper = (dispatch) => ({
})

const ListenerSection = connect(stateToProperty, propertyToDispatchMapper)(Listener);
export default ListenerSection;