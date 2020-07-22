import React from 'react';
import LineChart from './LineChart';
import {
  getEventStatistic,
  getTodayTraffic,
  getMonthTraffic,
} from '../../../apis/event';
class NetworkTraffic extends React.Component {
  state = { wan: [], lan: [], management: [], dmz: [] };

  getTraffic = async () => {
    let trafficQuery = getEventStatistic;
    let selectedDate = 30;
    switch (this.props.selectOption) {
      case 'Today':
        trafficQuery = getTodayTraffic;
        break;
      case '7 days latest':
        selectedDate = 7;
        break;
      case 'Months':
        trafficQuery = getMonthTraffic;
        break;
      default:
        break;
    }

    const wan = await trafficQuery('WAN', selectedDate);
    const lan = await trafficQuery('LAN', selectedDate);
    const management = await trafficQuery('MANAGEMENT', selectedDate);
    const dmz = await trafficQuery('DMZ', selectedDate);
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
