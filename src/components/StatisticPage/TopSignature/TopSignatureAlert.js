import React from 'react';
import { getSigTop } from '../../../apis/signature';
import { getEventsBySignature } from '../../../apis/event';
import TopSignatureTable from './TopSignatureTable';
import EventBySignatureModal from './EventBySignatureModal';
class TopSignatureAlert extends React.Component {
  state = { topSig: [], showAlertModal: false, sigName: '', events: [] };

  async componentDidMount() {
    const topSig = await getSigTop();
    console.log('----------------');
    console.log(topSig);
    this.setState({ topSig });
  }
  onHideAlertModal = () => {
    this.setState({ showAlertModal: false });
  };
  onShowAlertModal = async (sigName) => {
    const events = await getEventsBySignature(sigName);

    const showAlertModal = true;
    this.setState({ sigName, events, showAlertModal });
  };
  render() {
    return (
      <>
        <EventBySignatureModal
          show={this.state.showAlertModal}
          onHide={this.onHideAlertModal}
          signame={this.state.signame}
          events={this.state.events}
        />
        <TopSignatureTable
          topSig={this.state.topSig}
          showAlertModal={this.onShowAlertModal}
        />
      </>
    );
  }
}

export default TopSignatureAlert;
