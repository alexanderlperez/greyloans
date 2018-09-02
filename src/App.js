import React, { Component } from 'react';
import LoanForm from 'Forms/LoanForm';
import Matches from 'Forms/Matches';
import MatchedGraph from 'Components/MatchedGraph';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            currentMatch: {},
            data: {}
        }

        this.updateMatches = this.updateMatches.bind(this);
        this.setCurrentMatch = this.setCurrentMatch.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    updateMatches(matches) {
        this.setState({matches})
    }

    setCurrentMatch(currentMatch) {
        this.setState({currentMatch})
    }

    updateData(data) {
        this.setState({data})
    }

    render() {
        return (
            <div className="App container">
                <div className="loan-form row justify-content-center">
                    <div className="col">
                        <LoanForm 
                            updateData={this.updateData}
                            updateMatches={this.updateMatches} />
                    </div>
                </div>

                <div className={"loan-form-matches row " + (this.state.matches.length ? '' : 'hidden')}>
                    <div className="col-3">
                        <MatchedGraph 
                            clientNOI={this.state.data.noi}
                            debtService={this.state.currentMatch["Annual Debt Service"]} 
                            proceeds={this.state.currentMatch["Proceeds"]} />
                    </div>
                    <div className="col-9">
                        <Matches 
                            setCurrentMatch={this.setCurrentMatch} 
                            matches={this.state.matches} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
