import React, { Component } from 'react';
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class MatchedGraph extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="MatchedGraph">
                <ColumnChart 
                    messages={{empty: "No Data"}}
                    data={[
                        ["Property NOI", this.props.clientNOI], 
                        ["Debt Service", this.props.debtService],
                        ["Proceeds", this.props.proceeds]
                    ]}/>
            </div>
        );
    }
}

export default MatchedGraph;

