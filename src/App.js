import React, { Component } from 'react';
import LoanForm from 'Pages/LoanForm';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <LoanForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
