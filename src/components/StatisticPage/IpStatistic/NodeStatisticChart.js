import React from 'react';
import { Pie } from 'react-chartjs-2';
import { colors } from '../../../PredefineValue';
class NodeStatisticChart extends React.Component {
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
    data.labels = this.props.nodeList.map((item) => item.ip);

    // this.setState({ data });

    return (
      <>
        <h2 className="text-center">{this.props.title}</h2>
        <Pie data={data} />
      </>
    );
  }
}

export default NodeStatisticChart;
