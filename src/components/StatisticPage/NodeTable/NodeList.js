import React from 'react';

import NodeEventModal from './NodeEventModal';
import NodeTable from './NodeTable';
import { getNodesCount, getNodeEvents } from '../../../apis/local_nodes';
class NodeList extends React.Component {
  state = { nodeList: [], showNodeEventModal: false, events: [], nodeName: '' };

  fetchNodeList = async () => {
    const nodeList = await getNodesCount(this.props.iface);
    this.setState({ nodeList });
  };
  componentDidMount() {
    this.fetchNodeList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.iface !== this.props.iface) {
      this.fetchNodeList();
    }
  }

  onHideNodeEventModal = () => {
    this.setState({ showNodeEventModal: false });
  };
  onShowNodeEventModal = async (nodeName) => {
    const events = await getNodeEvents(nodeName);

    const showNodeEventModal = true;
    this.setState({ nodeName, events, showNodeEventModal });
  };
  render() {
    return (
      <>
        <NodeEventModal
          show={this.state.showNodeEventModal}
          onHide={this.onHideNodeEventModal}
          name={this.state.nodeName}
          events={this.state.events}
        />
        <NodeTable
          nodeList={this.state.nodeList}
          onShowNodeEventModal={this.onShowNodeEventModal}
        />
      </>
    );
  }
}

export default NodeList;
