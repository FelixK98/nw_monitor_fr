import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ wan, lan, management, dmz }) => {
  const datasetProto = {
    label: 'My First dataset',
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [65, 59, 80, 81, 56, 55, 40],
  };
  const wanSet = { ...datasetProto };
  const lanSet = { ...datasetProto };
  const managementSet = { ...datasetProto };
  const dmzSet = { ...datasetProto };
  //color
  lanSet.borderColor = 'rgb(204, 102, 0)';
  lanSet.backgroundColor = 'rgba(204, 102, 0,0.4)';
  managementSet.borderColor = 'rgb(191, 63, 191)';
  managementSet.backgroundColor = 'rgba(191, 63, 191, 0.4)';
  dmzSet.borderColor = 'rgb(191, 191, 63)';
  dmzSet.backgroundColor = 'rgba(191, 191, 63, 0.4)';
  //data
  wanSet.data = wan.map((item) => item.count);
  lanSet.data = lan.map((item) => item.count);
  managementSet.data = management.map((item) => item.count);
  dmzSet.data = dmz.map((item) => item.count);
  //label
  wanSet.label = 'WAN';
  lanSet.label = 'LAN';
  managementSet.label = 'MANAGEMENT';
  dmzSet.label = 'DMZ';
  //TIME
  const time = wan.map((item) => item.time);
  const data = {
    labels: time,
    datasets: [wanSet, lanSet, managementSet, dmzSet],
  };
  return <Line data={data} />;
};

export default LineChart;
