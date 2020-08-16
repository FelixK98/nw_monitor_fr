import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { colors } from '../../../PredefineValue';
import DetailCulpritModal from '../../ComonPage/DetailCulpritModal';
import { getCulpritDetail, getTodayCulpritDetail } from '../../../apis/ip';
import { getBlockList, addBlockIP, unblockIP } from '../../../apis/block_ip';
import {
  addBlockIP as addToMySQL,
  deleteBlockIP,
} from '../../../apis/block_ip_nodejs';
class PriorityDoughnutChart extends React.Component {
  state = { show: false, alertCulpritDetail: [], target: '' };
  data = {
    labels: this.props.detail.map((item) => item.signame),
    datasets: [
      {
        data: this.props.detail.map((item) => item.count),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  onItemClick = (e) => {
    const eventValue = e.target.value;
    this.handleItemDetail(eventValue);
  };
  getCulpritApi = async (sigName) => {
    let culprits = [];
    switch (this.props.option) {
      case 'Today':
        culprits = await getTodayCulpritDetail(sigName);
        break;
      default:
        culprits = await getCulpritDetail(sigName);
    }
    return culprits;
  };
  handleItemDetail = async (eventValue) => {
    let alertCulpritDetail = await this.getCulpritApi(eventValue);
    let blockList = await getBlockList();

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
    await addToMySQL(ip);
    this.handleItemDetail(this.state.target);
  };
  onUnblockIP = async (ip) => {
    await unblockIP(ip);
    await deleteBlockIP(ip);
    this.handleItemDetail(this.state.target);
  };
  onHide = () => {
    this.setState({ show: false });
  };
  renderAlertList = () => {
    return this.props.detail.map((item) => (
      <input
        key={item.signame}
        type="button"
        value={item.signame}
        className="list-group-item list-group-item-action"
        onClick={this.onItemClick}
      />
    ));
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <DetailCulpritModal
            ipStatus={this.state.ipStatus}
            culpritDetail={this.state.alertCulpritDetail}
            onAddBlockIP={this.onAddBlockIP}
            onUnblockIP={this.onUnblockIP}
            target={this.state.target}
            show={this.state.show}
            onHide={this.onHide}
            option={this.props.option}
          />

          <Doughnut data={this.data} />
        </div>
        <div className="list-group col-md-12 text-center">
          <a
            href="#/"
            className="list-group-item list-group-item-action active"
          >
            View Detail
          </a>
          {this.renderAlertList()}
        </div>
      </div>
    );
  }
}

export default PriorityDoughnutChart;
