import React from 'react';
import NodePieChart from './NodePieChart';
import { getDestinationIps, getSourceIps } from '../../../apis/ip';
import { getNodesByIP } from '../../../apis/local_nodes';
class NodeStatistic extends React.Component {
  state = {
    dstIPs: [],
    srcIPs: [],
    nodeInfo: {},
  };
  async componentDidMount() {
    const dstIPs = await getDestinationIps(this.props.match.params.ip);
    const srcIPs = await getSourceIps(this.props.match.params.ip);
    const nodeInfo = await getNodesByIP(this.props.match.params.ip);

    this.setState({ dstIPs, srcIPs, nodeInfo });
  }
  renderHeader = () => {
    if (this.state.nodeInfo.length) {
      const { name, ip, network } = this.state.nodeInfo[0];
      return `${network}/${name}@${ip}`;
    }
  };
  render() {
    return (
      <>
        <h1 className=" font-weight-bold bg-white  text-center">
          {this.renderHeader()}
        </h1>
        <div className="row">
          <div className="col-md-6">
            <NodePieChart title="TOP Egress Traffic" ips={this.state.dstIPs} />
          </div>
          <div className="col-md-6">
            <NodePieChart title="TOP Ingress Traffic" ips={this.state.srcIPs} />
          </div>
        </div>
      </>
    );
  }
}

export default NodeStatistic;
