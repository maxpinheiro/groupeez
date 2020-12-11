import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Artist extends React.Component {
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

const ArtistSection = connect(stateToProperty, propertyToDispatchMapper)(Artist);
export default ArtistSection;