import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { colors } from '../../PredefineValue';

class NodeDoughnutChart extends React.Component {
  data = {};

  data = {
    labels: this.props.detail && this.props.detail.map((item) => item.signame),
    datasets: [
      {
        data: this.props.detail && this.props.detail.map((item) => item.count),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  render() {
    return <Doughnut data={this.data} />;
  }
}

export default NodeDoughnutChart;
