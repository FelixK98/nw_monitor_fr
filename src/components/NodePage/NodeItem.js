import React from 'react';
import {
  getStatisticByIP,
  getCulpritDetailByPriorityAndIP,
} from '../../apis/ip';
import { getNodesOnlineOffline, getBlockList } from '../../apis/block_ip';
import { sleep } from '../../PredefineValue';
class NodeItem extends React.Component {
  state = { status: '', show: false, data: [], isOnline: false };

  isCulpritAvailable = (blockList, ipList) => {
    for (let i = 0; i < ipList.length; i++) {
      console.log(ipList[i]);
      if (!blockList.includes(ipList[i])) {
        return true;
      }
    }
    return false;
  };
  getStatus = async () => {
    const dangerIP = await getCulpritDetailByPriorityAndIP(
      1,
      this.props.node.ip
    );
    const warningIP = await getCulpritDetailByPriorityAndIP(
      2,
      this.props.node.ip
    );
    const blockList = await getBlockList();
    let status = 'success';
    if (dangerIP.length > 0) {
      console.log('------------');

      status = this.isCulpritAvailable(blockList, dangerIP)
        ? 'danger'
        : 'success';
    } else if (warningIP.length > 0) {
      status = this.isCulpritAvailable(blockList, warningIP)
        ? 'warning'
        : 'success';
    }
    const data = await getStatisticByIP(this.props.node.ip);

    this.setState({ status, data });
  };
  async getOnlineOffline() {
    while (true) {
      const isOnline = await getNodesOnlineOffline(this.props.node.ip);
      this.setState({ isOnline });
      await sleep(30000);
    }
  }

  async componentDidMount() {
    await this.getStatus();
    await this.getOnlineOffline();
  }
  renderIcon() {
    switch (this.state.status) {
      case 'danger':
        return 'anticon anticon-close-o';
      case 'warning':
        return 'anticon anticon-exclamation-o';
      default:
        return 'anticon anticon-check-o';
    }
  }
  renderSituation() {
    switch (this.state.status) {
      case 'danger':
        return 'DANGER';
      case 'warning':
        return 'WARNING';
      default:
        return 'NORMAL';
    }
  }
  onShow = () => {
    this.props.onShow(this.state.data, this.props.node.ip);
  };
  render() {
    const { ip, mac, type, name } = this.props.node;
    let img = '';
    switch (type) {
      case 'FIREWALL':
        img = 'https://image.flaticon.com/icons/png/512/811/811683.png';
        break;
      case 'HOST':
        img =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHSH63tcopGtf6VmLAdv3SE8x7HgZhu3xXDRuDrpMwayVF6JeP&usqp=CAU';
        break;
      default:
        img =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgxJpeL-kOkf9QsYVEpKkZKZdGAWwslikDS8S_Ce8O36ilEaGo&usqp=CAU';
        break;
    }

    return (
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="m-t-20 text-center">
              <div
                className="avatar avatar-image"
                style={{ height: '100px', width: '100px' }}
              >
                <img className="card-img-top" src={img} alt="Card" />
              </div>
              <h4 className="m-t-30">{type}</h4>
              <p>
                {name}@{ip}
                <br />
                {mac}
              </p>
              <span
                className={
                  this.state.isOnline
                    ? 'badge badge-success'
                    : 'badge badge-grey'
                }
              >
                {this.state.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="text-center m-t-20">
              <div
                style={{ cursor: 'pointer' }}
                className={`alert alert-${this.state.status}`}
                onClick={this.onShow}
              >
                <div className="d-flex align-items-center justify-content-start">
                  <span className="alert-icon">
                    <i className={this.renderIcon()}></i>
                  </span>
                  <span className="font-weight-bold">
                    <center>In {this.renderSituation()} situation</center>
                  </span>
                </div>
              </div>
              {/* <Link to={`/node/${ip}`} className="btn btn-primary btn-tone">
              View Detail
            </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NodeItem;
