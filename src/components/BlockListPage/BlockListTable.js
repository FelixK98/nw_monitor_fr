import React from 'react';

class BlockListTable extends React.Component {
  renderBlockList = () => {
    return this.props.blockListArr.map((item, index) => {
      const onUnblockIP = (e) => {
        this.props.onUnblockIP(item.ip);
      };
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.ip}</td>
          <td>{item.time}</td>
          <td>
            <button
              onClick={onUnblockIP}
              className="btn btn-success btn-tone m-r-5"
            >
              Unblock
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IP</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderBlockList()}</tbody>
        </table>
      </div>
    );
  }
}

export default BlockListTable;
