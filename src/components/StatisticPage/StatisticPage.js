import React from 'react';
import PriorityList from './Priority/PriorityList';
import NetworkTraffic from './Traffic/NetworkTraffic';
import TopSignatureAlert from './TopSignature/TopSignatureAlert';
import NodeStatistic from './IpStatistic/NodeStatistic';
import NodeList from './NodeTable/NodeList';
import {
  getStatisticLocalSourceIp,
  getStatisticExternalSourceIp,
  getStatisticLocalDstIp,
  getStatisticExternalDstIp,
} from '../../apis/ip';

class StatisticPage extends React.Component {
  state = { selectStatisticOption: '30 days latest', nodeIface: 'LAN' };
  handleSelect = (e) => {
    const selectStatisticOption = e.target.value;
    this.setState({ selectStatisticOption });
  };
  handleNodeChose = (e) => {
    const nodeIface = e.target.value;
    this.setState({ nodeIface });
  };
  render() {
    return (
      <>
        <div className="card" style={{ width: '100%' }}>
          <div className="card-header text-center">
            <h4 className="card-title">Priority Count</h4>
          </div>
          <div className="card-body">
            <div className="row ">
              <PriorityList />
            </div>
          </div>
        </div>
        <div className="card" style={{ width: '100%' }}>
          <div className="card-header text-center">
            <h4 className="card-title offset-md-4 col-md-4">
              Packet Count
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.handleSelect}
              >
                <option>30 days latest</option>
                <option>7 days latest</option>
                <option>Today</option>
                <option>Months</option>
              </select>
            </h4>
          </div>
          <div className="card-body">
            <div className="row m-3">
              <div className=" col-md-12 col-xs-12">
                <NetworkTraffic
                  selectOption={this.state.selectStatisticOption}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: '100%' }}>
          <div className="card-header text-center">
            <h4 className="card-title">Packet Count</h4>
          </div>
          <div className="card-body">
            <div className="row m-3">
              <div className=" offset-md-1 col-md-10 col-xs-12">
                <TopSignatureAlert />
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: '100%' }}>
          <div className="card-header text-center offset-md-4 col-md-4">
            <h4 className="card-title">Node Count</h4>
            <select
              className="form-control"
              id="exampleFormControlSelect2"
              onChange={this.handleNodeChose}
            >
              <option>LAN</option>
              <option>MANAGEMENT</option>
              <option>DMZ</option>
            </select>
          </div>
          <div className="card-body">
            <div className="row m-3">
              <div className=" offset-md-1 col-md-10 col-xs-12">
                <NodeList iface={this.state.nodeIface} />
              </div>
            </div>
          </div>
        </div>

        <div className="row m-3">
          <div className="col-md-6 col-xs-12">
            <NodeStatistic
              title="Local Source Packet Statistic(TOP10)"
              getStatistic={getStatisticLocalSourceIp}
            />
          </div>
          <div className="col-md-6 col-xs-12">
            <NodeStatistic
              title="External Source Packet Statistic(TOP10)"
              getStatistic={getStatisticExternalSourceIp}
            />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-6 col-xs-12">
            <NodeStatistic
              title="Local Destination Packet Statistic(TOP10)"
              getStatistic={getStatisticLocalDstIp}
            />
          </div>
          <div className="col-md-6 col-xs-12">
            <NodeStatistic
              title="External Destination Packet Statistic(TOP10)"
              getStatistic={getStatisticExternalDstIp}
            />
          </div>
        </div>
      </>
    );
  }
}

export default StatisticPage;
