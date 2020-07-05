import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

class AlertTable extends React.Component {
  render() {
    const table = {
      columns: [
        {
          label: 'Time',
          field: 'Time',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Priority',
          field: 'Priority',
          width: 270,
        },
        {
          label: 'Protocol',
          field: 'Protocol',
          width: 200,
        },
        {
          label: 'Class Type',
          field: 'Class Type',
          width: 100,
        },
        {
          label: 'Source Address',
          field: 'Source Address',

          width: 150,
        },
        {
          label: 'Destination Address',
          field: 'Destination Address',

          width: 100,
        },
        {
          label: 'Description',
          field: 'Description',

          width: 100,
        },
      ],
      rows: this.props.events,
    };
    return (
      <MDBDataTableV5
        className="table-head-bg-primar"
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={table}
      />
    );
  }
}

export default AlertTable;
