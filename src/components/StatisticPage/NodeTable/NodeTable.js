import React from 'react';

const NodeTable = ({ nodeList, onShowNodeEventModal }) => {
  const renderContent = () => {
    return nodeList.map((item, index) => {
      const handleOnclick = () => {
        onShowNodeEventModal(item.name);
      };
      return (
        <tr onClick={handleOnclick} style={{ cursor: 'pointer' }} key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>
            {item.count}
            {/* <div className="d-flex align-items-center">
              <div className="progress progress-sm w-100 m-b-0">
                <div
                  className={`progress-bar bg-${item.color}`}
                  style={{ width: item.ratio }}
                ></div>
              </div>
              <div className="m-l-10">{item.count}</div>
            </div> */}
            {/* {item.count} */}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    </div>
  );
};

export default NodeTable;
