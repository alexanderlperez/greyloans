import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function Unit({ monthlyRent, unitNumber, vacancy, bedrooms, bathrooms, annualTotal }) {
    return (
        <Fragment>
            <br />
            <Label> Montly Rent <Input type="text" value={monthlyRent} /> </Label>
            <Label> Unit # <Input type="text" value={unitNumber} /> </Label>
            <Label> Vacancy <Input type="text" value={vacancy} /> </Label>
            <Label> Bedrooms <Input type="text" value={bedrooms} /> </Label>
            <Label> Bathrooms <Input type="text" value={bathrooms} /> </Label>
            <Label> Annual Total <Input type="text" value={annualTotal} /> </Label>
        </Fragment>
    );
}


class LoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: 0,
            expenses: 0,
            rate: 0,  
            noi: 0,  
            address: '',
            addressParts: {
                street : '',
                city  : '',
                state : '',
                county: '',
                zip   : ''
            },
            units: [],
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRepeater = this.addRepeater.bind(this);
    }

    addRepeater() {
        const units = this.state.units.slice()
        units.push({ 
            monthlyRent: '', 
            unitNumber: '', 
            vacancy: '', 
            bedrooms: '', 
            bathrooms: '', 
            annualTotal: ''
        })

        this.setState({
            units
        })
    }

    handleChange (address) {
        this.setState({ address  });
    }

    handleSelect (address) {
        geocodeByAddress(address)
            .then(results => {
                console.log(results);

                function getAddressParts(parts, target) {
                    // search through array to get target from "types" subarray
                    return parts.find(part => part.types.find(type => type === target)).long_name;
                }

                const addressParts = {
                    street: getAddressParts(results[0].address_components, 'street_number') + ' ' + getAddressParts(results[0].address_components, 'route'),
                    city: getAddressParts(results[0].address_components, 'sublocality_level_1'),
                    state: getAddressParts(results[0].address_components, 'administrative_area_level_1'),
                    county: getAddressParts(results[0].address_components, 'administrative_area_level_2'),
                    zip: getAddressParts(results[0].address_components, 'postal_code'),
                };

                console.log(addressParts);

                this.setState({addressParts})
            })
            .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <div className="LoanForm">
                <h1>Loan Form</h1>
                <Form>
                    <FormGroup>
                        <Label for="address">Property Address</Label>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}>

                            {({ getInputProps, suggestions, getSuggestionItemProps, loading  }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                        })}
                                    />

                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer'  }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer'  };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </FormGroup>

                    <div className="ExpenseItems">
                        <h2>Expense Items</h2>
                        <Label>Marketing <Input type="text" /></Label> 
                        <Label>Taxes <Input type="text" /></Label> 
                        <Label>Insurance <Input type="text" /></Label> 
                        <Label>Repairs <Input type="text" /></Label> 
                        <Label>Administration <Input type="text" /></Label> 
                        <Label>Payroll <Input type="text" /></Label> 
                        <Label>Utility <Input type="text" /></Label> 
                        <Label>Management <Input type="text" /></Label>
                    </div>

                    <div className="Repeater">
                        <h2>Rent Roll</h2>
                        {this.state.units.map((unit, i) => (
                            <Unit {...unit} key="i"/>
                        ))}
                        <Button onClick={this.addRepeater} color="primary">Add Unit</Button>
                    </div>

                    <div className="CapitalizationRate">
                        <h2>Capitalization Rate</h2>
                        <Label>Net Operating Income<Input type="text" /></Label> 
                        <Label>Current Property Value <Input type="text" /></Label> 
                    </div>
                </Form>
            </div>
        );
    }
}

export default LoanForm;

