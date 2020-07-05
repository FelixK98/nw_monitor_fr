import React from 'react';
import EventBySignatureTable from './EventBySignatureTable';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
class EventBySignatureModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.signame}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventBySignatureTable events={this.props.events} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EventBySignatureModal;
