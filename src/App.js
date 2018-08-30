import React, { Component } from 'react';
import LoanForm from './Pages/LoanForm.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <LoanForm />
            </div>
        );
    }
}

export default App;
