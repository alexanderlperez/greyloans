import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';

class Unit extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e) {
        let value = parseInt(e.target.value, 10);
        const name = e.target.name;

        if (Number.isNaN(value)) {
            value = 0;
        }

        this.props.onFieldChange(this.props.entryId, name, value)
    }

    render() {
        return (
            <div className="RentalUnit">
                <Label><input type="checkbox" /> Vacant</Label>
                <Label>Montly Rent ($)<Input type="text" value={this.props.rent} name="rent" onChange={this.handleFieldChange} /></Label>
                <Label>Unit # <Input type="text" value={this.props.num} name="num" onChange={this.handleFieldChange} /></Label>
                <Label>Bedrooms <Input type="text" value={this.props.rooms} name="rooms" onChange={this.handleFieldChange} /></Label>
                <Label>Bathrooms <Input type="text" value={this.props.baths} name="baths" onChange={this.handleFieldChange} /></Label>
                <br />
                <span>Annual Total: ${this.props.annual}</span>
            </div>
        );
    }
}

export default Unit;
