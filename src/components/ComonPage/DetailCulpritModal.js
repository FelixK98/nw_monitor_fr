import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import { getTime } from '../../apis/event';
import TimeModal from './TimeModal';
class DetailCulpritModal extends React.Component {
  state = { showTimeModal: false, times: [] };

  onHide = () => {
    this.props.onHide(false);
  };
  onHideTimeModal = () => {
    this.setState({ showTimeModal: false });
  };
  renderCulprit = () => {
    return this.props.culpritDetail.map((item, index) => {
      const onAddBlockIP = () => {
        this.props.onAddBlockIP(item.ip);
      };
      const onUnblockIP = () => {
        this.props.onUnblockIP(item.ip);
      };
      const handleViewTime = async () => {
        const times = await getTime(item.ip, this.props.target);
        const showTimeModal = true;
        this.setState({ showTimeModal, times });
      };
      return (
        <tr key={item.ip}>
          <th scope="row">{index + 1}</th>
          <td id={item.ip}>{item.ip}</td>
          <td>{item.count}</td>
          <td>
            <span
              className={`badge badge-${
                item.status === 'Active' ? 'success' : 'danger'
              } `}
            >
              {item.status}
            </span>
          </td>
          <td>
            {item.status === 'Active' ? (
              <button
                onClick={onAddBlockIP}
                className="btn btn-danger btn-tone m-0"
              >
                Block
              </button>
            ) : (
              <button
                onClick={onUnblockIP}
                className="btn btn-success btn-tone m-0"
              >
                Unblock
              </button>
            )}
            <button
              onClick={handleViewTime}
              className="btn btn-secondary btn-tone m-0 "
            >
              View Time
            </button>
          </td>
        </tr>
      );
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
            {this.props.target}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive text-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">IP</th>
                  <th scope="col">Count</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCulprit()}</tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
          <TimeModal
            times={this.state.times}
            show={this.state.showTimeModal}
            onHide={this.onHideTimeModal}
          />
        </Modal.Footer>
      </Modal>,
      document.querySelector('#modal')
    );
  }
}

export default DetailCulpritModal;
