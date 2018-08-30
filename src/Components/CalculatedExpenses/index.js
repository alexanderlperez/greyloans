import React, { Component, Fragment } from 'react';
import { Label, Input } from 'reactstrap';

class CalculatedExpenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            marketing: 0,
            taxes: 0,
            insurance: 0,
            repairs: 0,
            administration: 0,
            payroll: 0,
            utility: 0,
            management: 0,
        };

        this.calcExpenses = this.calcExpenses.bind(this);
    }

    calcExpenses(e) {
        let expense = parseInt(e.target.value, 10);

        if (Number.isNaN(expense)) {
            expense = 0;
        }

        this.setState({
            [e.target.name]: expense
        }, () => {
            const forExpenses = (acc, cur) => acc + cur;
            const totalExpenses = Object.values(this.state).reduce(forExpenses, 0);

            this.props.onExpensesChange(totalExpenses);
        })
    }

    render() {
        return (
            <Fragment>
                <Label>Marketing <Input type="text" value={this.state.marketing} name="marketing" onChange={this.calcExpenses}/></Label> 
                <Label>Taxes <Input type="text" value={this.state.taxes} name="taxes" onChange={this.calcExpenses}/></Label> 
                <Label>Insurance <Input type="text" value={this.state.insurance} name="insurance" onChange={this.calcExpenses}/></Label> 
                <Label>Repairs <Input type="text" value={this.state.repairs} name="repairs" onChange={this.calcExpenses}/></Label> 
                <Label>Administration <Input type="text" value={this.state.administration} name="administration" onChange={this.calcExpenses}/></Label> 
                <Label>Payroll <Input type="text" value={this.state.payroll} name="payroll" onChange={this.calcExpenses}/></Label> 
                <Label>Utility <Input type="text" value={this.state.utility} name="utility" onChange={this.calcExpenses}/></Label> 
                <Label>Management <Input type="text" value={this.state.management} name="management" onChange={this.calcExpenses}/></Label>
            </Fragment>
        );
    }
}

export default CalculatedExpenses;
