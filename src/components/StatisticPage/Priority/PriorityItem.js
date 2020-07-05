import React from 'react';

const PriorityAlert = ({ icon, count, title, color, onClick, priority }) => {
  const onAlertClick = () => {
    onClick(priority);
  };
  return (
    <div className="col-md-3">
      <div
        onClick={onAlertClick}
        style={{ cursor: 'pointer' }}
        className={`card card-stats card-${color}`}
      >
        <div className="card-body ">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center">
                <i className={icon}></i>
              </div>
            </div>
            <div className="col-7 d-flex align-items-center">
              <div className="numbers">
                <p className="card-category">{title} ALERT</p>
                <h4 className="card-title">{count}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriorityAlert;
