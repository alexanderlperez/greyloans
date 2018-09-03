import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

function Map ({coords, isMarkerShown}) {
    return (
        <GoogleMap
            defaultZoom={16}
            center={coords}>
            {isMarkerShown && <Marker position={coords} />}
        </GoogleMap>
    )
}

export default withGoogleMap(Map)

