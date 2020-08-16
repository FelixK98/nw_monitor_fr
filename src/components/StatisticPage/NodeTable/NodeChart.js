import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { colors } from '../../../PredefineValue';
export class NodeChart extends Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    },
  };
  componentDidMount() {}
  render() {
    const data = { ...this.state.data };

    data.datasets[0].data = this.props.nodeList.map((item) => item.count);
    data.labels = this.props.nodeList.map((item) => item.name);

    // this.setState({ data });

    return (
      <>
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <Pie data={data} />
          </div>
        </div>
      </>
    );
  }
}
export default NodeChart;
