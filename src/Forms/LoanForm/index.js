import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import CalculatedExpenses from 'Components/CalculatedExpenses';
import Repeater from 'Components/Repeater';
import Unit from 'Components/RentalUnitEntry';
import MapPropertyAddress from 'Components/MapPropertyAddress';

const CALC_API = "https://script.google.com/macros/s/AKfycbwPGz6uQQS9IW33ASPYlcWaEtRMD8eDAK1ONg7lT2dREXpaSUYh/exec";

class LoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressParts: {
                street: '',
                city: '',
                state: '',
                county: '',
                zip: ''
            },
            address: '',
            coords: {lat: 40.6, lng: -74},
            units: [],
            income: 0,
            expenses: 0,
            rate: 0,  
            noi: 0,  
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleExpensesChange = this.handleExpensesChange.bind(this); // called in various methods
        this.processForm = this.processForm.bind(this)

        // address
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);

        // rent roll
        this.addUnit = this.addUnit.bind(this);
        this.removeUnit = this.removeUnit.bind(this);
        this.handleUnitFieldChange = this.handleUnitFieldChange.bind(this);
    }

    handleFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addUnit() {
        const units = this.state.units;

        units.push({
            entryId: Date.now(), // to update correct entry
            rent: 0,
            num: 0,
            isVacant: 0,
            rooms: 0,
            baths: 0,
            annual: 0
        })

        this.setState({units})
    }

    removeUnit(id) {
        const idx = this.state.units.findIndex((unit) => unit.entryId === id)
        const units = this.state.units.slice();

        units.splice(idx, 1);

        const income = units.length === 0
            ? 0 // reset income since there's no units
            : this.state.income;

        this.setState({
            units,
            income,
        }, () => {
            this.handleExpensesChange(this.state.expenses)
        })
    }

    handleUnitFieldChange(id, name, value) {
        //update the correct entry's field (by name)
        //then update the total income

        const idx = this.state.units.findIndex((unit) => unit.entryId === id)
        const units = this.state.units.slice();

        units[idx][name] = value;
        units[idx].annual = units[idx].rent * 12;

        const income = units.reduce((acc, unit) => acc + unit.annual, 0)

        this.setState({
            units,
            income,
        }, () => {
            this.props.updateData({
                address: this.state.address,
                income: this.state.income,
                expenses: this.state.expenses,
                rate: this.state.rate,
                noi: this.state.noi
            })
            this.handleExpensesChange(this.state.expenses)
        })
    }

    // updates expenses *and* noi
    handleExpensesChange(expenses) {
        if (Number.isNaN(expenses)) {
            expenses = 0;
        }

        const noi = this.state.income - expenses;

        this.setState({
            expenses,
            noi
        }, () => this.props.updateData({
            address: this.state.address,
            income: this.state.income,
            expenses: this.state.expenses,
            rate: this.state.rate,
            noi: this.state.noi
        }));
    }

    handleAddressChange(address) {
        this.setState({address});
    }

    handleSelect(address, addressParts, coords) {
        this.setState({
            address,
            addressParts,
            coords
        })
    }

    processForm() {
        const { 
            addressParts: address,
            income,
            expenses,
            rate,
            noi
        } = this.state;

        const data = { address, income, expenses, rate, noi };

        this.props.updateData(data)

        fetch(CALC_API, { method: 'POST', body: data})
            .then(res => res.json())
            .then(matches => {
                this.props.updateMatches(matches.terms)
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <Form className="LoanForm">
                <h1>Loan Form</h1>

                <section className="property-address">
                    <MapPropertyAddress 
                        address={this.state.address}
                        coords={this.state.coords} 
                        handleChange={this.handleAddressChange} 
                        handleSelect={this.handleSelect} />
                </section>

                <section className="rent-roll">
                    <h3>Rent Roll</h3>
                    <Repeater 
                        entryAdded={this.addUnit}
                        removeEntry={this.removeUnit}
                        collection={this.state.units} 
                        entry={(props, i) => 
                                <Unit {...props} key={i} onFieldChange={this.handleUnitFieldChange} />
                        }/>
                </section>

                <section className="expenses">
                    <h3>Expense Items</h3>
                    <p><i>All values in $</i></p>
                    <CalculatedExpenses onExpensesChange={this.handleExpensesChange} />
                </section>

                <section className="capitalization">
                    <Label>
                        Capitalization Rate (%)
                        <Input 
                            type="text" 
                            name="rate"
                            value={this.state.rate}
                            onChange={this.handleFieldChange} />
                    </Label>
                </section>

                <section className="noi">
                    <b>Net Operating Income: ${this.state.noi}</b> 
                </section>

                <section className="controls">
                    <Button onClick={this.processForm} color="success">Click for top matches</Button>
                </section>
            </Form>
        );
    }
}

export default LoanForm;
