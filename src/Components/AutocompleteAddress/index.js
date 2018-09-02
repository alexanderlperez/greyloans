import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './style.css';

// props from PlacesAutocomplete
// modified from example at: https://github.com/hibiken/react-places-autocomplete
function SearchWithSuggestions({ getInputProps, suggestions, getSuggestionItemProps, loading }) {
    const buildSuggestion = suggestion => {
        const className = 'suggestion-item' + (suggestion.active ? '--active' : '');

        return (
            <div {...getSuggestionItemProps(suggestion, { className })}>
                <span>{suggestion.description}</span>
            </div>
        );
    };

    return (
        <div className="autocomplete-wrapper">
            <input {...getInputProps({ placeholder: 'Search Places ...', className: 'location-search-input' })} />

            <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(buildSuggestion)}
            </div>
        </div>
    );
}

function addressObjFromComponents(components) {
    // find long_name in components array by matching within "types" subarray
    const nameByType = (parts, targetType) => 
        parts.find(part => part.types.find(type => type === targetType)).long_name;

    return {
        street: nameByType(components, 'street_number') + ' ' + nameByType(components, 'route'),
        city: nameByType(components, 'sublocality_level_1'),
        state: nameByType(components, 'administrative_area_level_1'),
        county: nameByType(components, 'administrative_area_level_2'),
        zip: nameByType(components, 'postal_code'),
    };
}

function AutocompleteAddress({ address, handleChange, handleSelect }) { 
    const processData = (address) => {
        geocodeByAddress(address)
            .then(res => Promise.all([
                addressObjFromComponents(res[0].address_components),
                getLatLng(res[0])
            ]))
            .then(data => handleSelect(address, data[0], data[1]))
            .catch(error => console.error('Error', error));
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={processData}>
            {SearchWithSuggestions}
        </PlacesAutocomplete>
    ) 
}

export default AutocompleteAddress;
