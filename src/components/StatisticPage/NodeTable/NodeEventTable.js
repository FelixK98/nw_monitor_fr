import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

class NodeEventTable extends React.Component {
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
          label: 'Src Address',
          field: 'Src Address',
          width: 270,
        },
        {
          label: 'Dst Address',
          field: 'Dst Address',
          width: 200,
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

export default NodeEventTable;
