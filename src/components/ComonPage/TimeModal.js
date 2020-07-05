import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import TimeTable from './TimeTable';
class TimeModal extends React.Component {
  onHide = () => {
    this.props.onHide();
  };

  mapTimesToTable = () => {
    return this.props.times.map((time, index) => {
      return { index: index + 1, ...time };
    });
  };
  render() {
    return ReactDOM.createPortal(
      <Modal
        onHide={this.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Time Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="table-responsive text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Time</th>
                  <th scope="col">Sensor</th>
                </tr>
              </thead>
              <tbody>{this.renderTime()}</tbody>
            </table>
          </div> */}
          <TimeTable getTimes={this.mapTimesToTable} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>,
      document.querySelector('#time')
    );
  }
}

export default TimeModal;
