import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import './style.css';

class Repeater extends Component {
    render() {
        return (
            <div className="Repeater">
                <Button onClick={this.props.entryAdded} color="primary">Add Entry</Button>

                {this.props.collection.map((props, i) => 
                    <div className="entry" key={i}>
                        <Button className="remove" onClick={({entryId}) => this.props.removeEntry(entryId)} key={Date.now()} color="secondary">✖</Button>
                        {this.props.entry(props, i)}
                    </div>
                )}
            </div>
        );
    }
}

export default Repeater;
