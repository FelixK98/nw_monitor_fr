import React from 'react';
import { getSigTop, getTodaySigTop } from '../../../apis/signature';
import { getEventsBySignature } from '../../../apis/event';
import TopSignatureTable from './TopSignatureTable';
import EventBySignatureModal from './EventBySignatureModal';
import TopSignatureChart from './TopSignatureChart';
class TopSignatureAlert extends React.Component {
  state = { topSig: [], showAlertModal: false, sigName: '', events: [] };

  async componentDidMount() {
    const topSig = await getSigTop();

    this.setState({ topSig });
  }
  getTopSigByOption = async () => {
    let topSig = [];
    switch (this.props.selectOption) {
      case 'Today':
        topSig = await getTodaySigTop();
        break;
      default:
        topSig = await getSigTop();
    }
    this.setState({ topSig });
  };
  async componentDidUpdate(prevProps) {
    if (prevProps.selectOption !== this.props.selectOption) {
      this.getTopSigByOption();
    }
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
        <TopSignatureChart topSig={this.state.topSig} />
        <TopSignatureTable
          topSig={this.state.topSig}
          showAlertModal={this.onShowAlertModal}
        />
      </>
    );
  }
}

export default TopSignatureAlert;
