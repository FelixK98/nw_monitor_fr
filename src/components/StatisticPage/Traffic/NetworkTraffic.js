import React from 'react';
import LineChart from './LineChart';
import { getEventStatistic, getTodayTraffic } from '../../../apis/event';
class NetworkTraffic extends React.Component {
  state = { wan: [], lan: [], management: [], dmz: [] };
  queryStatistic = () => {
    switch (this.props.selectOption) {
      case 'Today':
        return getTodayTraffic;
      default:
        return getEventStatistic;
    }
  };
  getTraffic = async () => {
    const wan = await this.queryStatistic()('WAN');
    const lan = await this.queryStatistic()('LAN');
    const management = await this.queryStatistic()('MANAGEMENT');
    const dmz = await this.queryStatistic()('DMZ');
    this.setState({ wan, lan, management, dmz });
  };
  componentDidMount() {
    this.getTraffic();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectOption !== this.props.selectOption) {
      this.getTraffic();
    }
  }
  render() {
    const { wan, lan, management, dmz } = this.state;
    return <LineChart wan={wan} lan={lan} management={management} dmz={dmz} />;
  }
}

export default NetworkTraffic;
