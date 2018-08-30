import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

// props from PlacesAutocomplete
const PlacesBody = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
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

const AutoCompleteInput = ({ address, handleChange, handleSelect }) => (
    <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}>
        {PlacesBody}
    </PlacesAutocomplete>
)

export default AutoCompleteInput;
