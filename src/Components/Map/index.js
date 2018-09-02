import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    // prevent unnecessary redraws
    shouldComponentUpdate(nextProps) {
        return Object.keys(this.props)
            .some(key => this.props[key] !== nextProps[key]);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={16}
                center={this.props.coords}>
                {this.props.isMarkerShown && <Marker position={this.props.coords} />}
            </GoogleMap>
        )
    }
}

export default withGoogleMap(Map)

