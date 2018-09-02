import React from 'react';
import { Label } from 'reactstrap';
import AutocompleteAddress from 'Components/AutocompleteAddress';
import Map from 'Components/Map';

function MapPropertyAddress({address, coords, handleChange, handleSelect}) {
    const mapUrl = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";
    const loadElem = <div style={{ height: '100%' }} />;
    const contElem = <div style={{ height: '400px', width: '400px' }} />;
    const mapElem = <div style={{ height: '100%' }} />;

    return (
        <div className="MapPropertyAddress">
            <Label>Property Address</Label>

            <AutocompleteAddress 
                address={address} 
                handleChange={handleChange} 
                handleSelect={handleSelect} />

            <Map 
                coords={coords}
                googleMapURL={mapUrl}
                loadingElement={loadElem}
                containerElement={contElem}
                mapElement={mapElem}
                isMarkerShown />
        </div>
    )
}

export default MapPropertyAddress;
