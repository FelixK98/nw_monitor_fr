import React from 'react';

import NodeStatisticChart from './NodeStatisticChart';
class LocalNodeStatistic extends React.Component {
  state = { nodeList: [] };

  async componentDidMount() {
    const nodeList = await this.props.getStatistic();

    this.setState({ nodeList });
  }
  render() {
    return (
      <NodeStatisticChart
        title={this.props.title}
        nodeList={this.state.nodeList}
      />
    );
  }
}

export default LocalNodeStatistic;
