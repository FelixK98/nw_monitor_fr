import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import NodeDoughnutChart from './NodeDoughnutChart';
import { getCulpritDetailBySigAndIP } from '../../apis/ip';
import { unblockIP, addBlockIP, getBlockList } from '../../apis/block_ip';
import DetailCulpritModal from '../ComonPage/DetailCulpritModal';
class NodeModal extends React.Component {
  state = { alertCulpritDetail: [], target: '', show: false };
  onHide = () => {
    this.props.hide();
  };
  getBackGroundColor(priority) {
    switch (priority) {
      case 1:
        return '#e6a8a5';
      case 2:
        return '#e8e7a7';
      default:
        return '#c9e8a7';
    }
  }
  getInterface() {
    switch (this.props.local_interface) {
      case 'WAN':
        return 'wan';
      case 'LAN':
        return 'lan';
      case 'MANAGEMENT':
        return 'opt1';
      case 'DMZ':
        return 'opt2';
    }
  }
  onItemClick = (e) => {
    const eventValue = e.target.value;

    this.handleItemDetail(eventValue);
  };

  handleItemDetail = async (eventValue) => {
    let alertCulpritDetail = await getCulpritDetailBySigAndIP(
      eventValue,
      this.props.ip
    );

    let blockList = await getBlockList();

    // let blockListArr = [];
    // blockListArr = blockListArr.concat(
    //   blockList.wan,
    //   blockList.lan,
    //   blockList.management,
    //   blockList.dmz
    // );
    alertCulpritDetail = alertCulpritDetail.map((item) => {
      return !blockList.includes(item.ip)
        ? { ...item, status: 'Active' }
        : { ...item, status: 'Blocked' };
    });
    const target = eventValue;
    const show = true;
    this.setState({ show, alertCulpritDetail, target });
  };
  onAddBlockIP = async (ip) => {
    await addBlockIP(ip);
    this.handleItemDetail(this.state.target);
  };
  onUnblockIP = async (ip) => {
    await unblockIP(ip);
    this.handleItemDetail(this.state.target);
  };
  renderAlertList = () => {
    return this.props.detail.map((item) => (
      <input
        style={{ backgroundColor: this.getBackGroundColor(item.priority) }}
        key={item.signame}
        type="button"
        value={item.signame}
        className="list-group-item list-group-item-action"
        onClick={this.onItemClick}
      />
    ));
  };
  hideDetailCulprit = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Modal
        onHide={this.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Node Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <div className="row">
            <div className="col-md-12">
              <NodeDoughnutChart detail={this.props.detail} />
            </div>
            <div className="col-md-12 text-center">
              {this.renderAlertList()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
          <DetailCulpritModal
            // ipStatus={this.state.ipStatus}
            culpritDetail={this.state.alertCulpritDetail}
            onAddBlockIP={this.onAddBlockIP}
            onUnblockIP={this.onUnblockIP}
            target={this.state.target}
            show={this.state.show}
            onHide={this.hideDetailCulprit}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NodeModal;
