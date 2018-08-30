import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

// props from PlacesAutocomplete
const SearchWithSuggestions = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
    function buildSuggestion(suggestion) {
        const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
        const style = suggestion.active
            ? { backgroundColor: '#fafafa', cursor: 'pointer'  }
            : { backgroundColor: '#ffffff', cursor: 'pointer'  };

        return (
            <div {...getSuggestionItemProps(suggestion, { className, style })}>
                <span>{suggestion.description}</span>
            </div>
        );
    };

    return (
        <div>
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

const AutoCompleteInput = ({ address, handleChange, handleSelect }) => (
    <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={(address) => {
            geocodeByAddress(address)
                .then(res => {
                    const addressObj = addressObjFromComponents(res[0].address_components)
                    handleSelect(address, addressObj);
                })
                .catch(error => console.error('Error', error));
        }}>
        {SearchWithSuggestions}
    </PlacesAutocomplete>
)

export default AutoCompleteInput;
