import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import PriorityDoughnutChart from './PriorityDoughnutChart';
class PriorityDetailModal extends React.Component {
  onHide = () => {
    this.props.onHide(false);
  };
  render() {
    // const isShow = this.props.show;
    return (
      <Modal
        onHide={this.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <PriorityDoughnutChart detail={this.props.detail} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PriorityDetailModal;
