import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import './style.css';

class Unit extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e) {
        const { name, value } = e.target;
        this.props.onFieldChange(this.props.entryId, name, value)
    }

    render() {
        return (
            <div className="RentalUnit">
                <span>Annual Total: ${this.props.annual}</span>
                <br />
                <Label>Montly Rent <Input type="text" value={this.props.rent} name="rent" onChange={this.handleFieldChange} /></Label>
                <Label>Unit # <Input type="text" value={this.props.num} name="num" onChange={this.handleFieldChange} /></Label>
                <Label>Vacancy <Input type="text" value={this.props.isVacant} name="isVacant" onChange={this.handleFieldChange} /></Label>
                <Label>Bedrooms <Input type="text" value={this.props.rooms} name="rooms" onChange={this.handleFieldChange} /></Label>
                <Label>Bathrooms <Input type="text" value={this.props.baths} name="baths" onChange={this.handleFieldChange} /></Label>
            </div>
        );
    }
}

export default Unit;
