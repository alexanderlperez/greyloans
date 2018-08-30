import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

class Repeater extends Component {
    render() {
        return (
            <div className="Repeater">
                <Button onClick={this.props.entryAdded} color="primary">Add Entry</Button>

                {this.props.collection.map((props, i) => 
                    <Fragment key={i}>
                        {this.props.entry(props, i)}
                        <Button onClick={({entryId}) => this.props.removeEntry(entryId)} key={Date.now()} color="secondary">-</Button>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Repeater;
