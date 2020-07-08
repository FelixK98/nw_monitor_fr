import React from 'react';
import { CSVLink } from 'react-csv';
class ExportExcel extends React.Component {
  render() {
    const headers = [
      { label: 'Time', key: 'Time' },
      { label: 'Priority', key: 'Priority' },
      { label: 'Protocol', key: 'Protocol' },
      { label: 'Class Type', key: 'Class Type' },
      { label: 'Source Address', key: 'Source Address' },
      { label: 'Destination Address', key: 'Destination Address' },
      { label: 'Description', key: 'Description' },
    ];

    const data = this.props.data;
    return (
      <button className="btn btn-success">
        <CSVLink data={data} headers={headers} filename="report.csv">
          Export
        </CSVLink>
        ;
      </button>
    );
  }
}

export default ExportExcel;
