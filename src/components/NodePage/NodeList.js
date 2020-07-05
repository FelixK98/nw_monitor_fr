import React from 'react';
import { getNodesByNetWork } from '../../apis/local_nodes';
import NodeItem from './NodeItem';
import { getStatisticByIP } from '../../apis/ip';
import NodeModal from './NodeModal';
class NodeList extends React.Component {
  state = {
    nodes: [],
    data: [],
    show: false,
    selectedIP: '',
  };
  async getNodes() {
    const nodes = await getNodesByNetWork(this.props.match.params.network);

    this.setState({ nodes });
  }
  async componentDidMount() {
    // const data = await getAllNodes();
    // const lanNode = data.filter((node) => node.network === 'LAN');
    // const managementNode = data.filter((node) => node.network === 'MANAGEMENT');
    // const dmzNode = data.filter((node) => node.network === 'DMZ');
    // this.setState({ lanNode, managementNode, dmzNode });

    this.getNodes();
  }
  getStatistic = async (ip) => {
    const data = await getStatisticByIP(ip);
    this.setState({ data, show: true });
    return data;
  };
  onHide = () => {
    this.setState({ show: false });
  };
  onShow = (data, selectedIP) => {
    this.setState({ show: true, data, selectedIP });
  };
  async componentDidUpdate(prevProps) {
    if (this.props.match.params.network != prevProps.match.params.network) {
      this.getNodes();
    }
  }

  render() {
    return (
      <div className="main-content">
        <h1 className=" font-weight-bold bg-white  text-center">
          {this.props.match.params.network}
        </h1>
        <div className="row m-3">
          {this.state.nodes.map((node) => {
            return (
              <NodeItem
                key={node.id}
                node={node}
                onShow={this.onShow}
                getStatistic={this.getStatistic}
              />
            );
          })}
        </div>
        <NodeModal
          show={this.state.show}
          hide={this.onHide}
          detail={this.state.data}
          ip={this.state.selectedIP}
          local_interface={this.props.match.params.network}
        />
      </div>
    );
  }
}

export default NodeList;
