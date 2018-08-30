import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { geocodeByAddress } from 'react-places-autocomplete';
import AutoCompleteInput from '../Components/AutoCompleteInput.js';
import Unit from '../Components/RentalUnitEntry.js';

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

        this.setState({units})
    }

    // for place autocomplete
    handleAddressChange(address) {
        this.setState({address});
    }

    // for place autocomplete
    handleSelect(address) {
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

        geocodeByAddress(address)
            .then(results => this.setState({
                addressParts: addressObjFromComponents(results[0].address_components)
            }))
            .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <div className="LoanForm">
                <h1>Loan Form</h1>
                <Form>
                    <FormGroup>
                        <Label for="address">Property Address</Label>
                        <AutoCompleteInput 
                            address={this.state.address} 
                            handleChange={this.handleChange} 
                            handleSelect={this.handleSelect} />
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
                        {this.state.units.map((unit, i) => 
                            <Unit {...unit} key={i}/>
                        )}
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

