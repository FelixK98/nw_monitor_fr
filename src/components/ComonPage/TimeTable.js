import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

class TimeTable extends React.Component {
  async componentDidMount() {}
  render() {
    // const times = this.props.mapTimesToTable();
    const tableData = {
      columns: [
        {
          label: '#',
          field: 'index',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Time',
          field: 'time',
          width: 270,
        },
        {
          label: 'Sensor',
          field: 'sensor',
          width: 200,
        },
      ],
      rows: this.props.getTimes(),
    };

    return (
      <MDBDataTableV5
        className="table-head-bg-primar"
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={tableData}
      />
    );
  }
}

export default TimeTable;
