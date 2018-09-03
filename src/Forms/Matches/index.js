import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

function valuesFromKeyOrder(obj, keys) {
    return keys.map(key => obj[key])
}

function decPlaces(val, places = 2) {
    return Number.parseFloat(val).toFixed(places)
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function rndK() {
    return Math.floor(Math.random() * 10000) + Date.now();
}

const headings = [
    "75% LTV Proceeds",
    "# Payments",
    "Agency",
    "Annual Debt Service",
    "Debt Constant",
    "Interest Rate",
    "NOI",
    "Payoff",
    "Proceeds",
    "Treasury",
    "Type",
    "Value",
    "Years"
];

class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: 1
        }

        this.nextPage = this.nextPage.bind(this);
    }

    nextPage() {
        this.setState({
            pages: this.state.pages + 1
        })
    }

    render() {
        return (
            <div className="Matches">
                <Table responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            {headings.map((term) => <td key={rndK()}>{term}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.matches.slice(0, this.state.pages * 3).map((match) => (
                            <tr onClick={() => this.props.setCurrentMatch(match)} key={rndK()}>
                                {valuesFromKeyOrder(match, headings).map((val) => 
                                    <td key={rndK()}>
                                        {isNumeric(val) ? decPlaces(val, 2) : val}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button onClick={this.nextPage} color="primary">Show More</Button>
            </div>
        );
    }
}

export default Matches;

