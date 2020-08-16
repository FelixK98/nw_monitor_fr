import React from 'react';
import PriorityItem from './PriorityItem';
import {
  getPriorityCount,
  getPriorityDetail,
  getPriorityTodayCount,
  getPriorityTodayDetail,
} from '../../../apis/event';
import PriorityDetailModal from './PriorityDetailModal';

class PriorityList extends React.Component {
  state = {
    priorities: [],
    show: false,
    priorityTitle: '',
    priority: 0,
    detail: [],
  };
  async componentDidMount() {
    let priorities = await getPriorityCount();
    this.setState({ priorities });
  }
  getPriorityCountApi() {
    switch (this.props.selectPriorityOption) {
      case 'Today':
        return getPriorityTodayCount;
      default:
        return getPriorityCount;
    }
  }
  getPriorityDetailApi = async (priority) => {
    let result = [];
    switch (this.props.selectPriorityOption) {
      case 'Today':
        result = await getPriorityTodayDetail(priority);
        break;
      default:
        result = await getPriorityDetail(priority);
    }
    return result;
  };
  async componentDidUpdate(prevProps) {
    if (prevProps.selectPriorityOption !== this.props.selectPriorityOption) {
      let fetchPriorities = this.getPriorityCountApi();
      let priorities = await fetchPriorities();
      this.setState({ priorities });
    }
  }
  onDetailClick = async (priority, title) => {
    const priorityTitle = title + ' DETAIL';
    const detail = await this.getPriorityDetailApi(priority);

    this.setState({ show: true, priorityTitle, priority, detail });
  };
  onHide = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <>
        <PriorityDetailModal
          show={this.state.show}
          onHide={this.onHide}
          title={this.state.priorityTitle}
          priority={this.state.priority}
          detail={this.state.detail}
          option={this.props.selectPriorityOption}
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-stop"
          title="SERIOUS"
          count={
            this.state.priorities['1'] ? this.state.priorities['1'].count : 0
          }
          color="danger"
          priority={
            this.state.priorities['1'] && this.state.priorities['1'].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-warning"
          title="WARNING"
          count={
            this.state.priorities['2'] ? this.state.priorities['2'].count : 0
          }
          color="warning"
          priority={
            this.state.priorities['2'] && this.state.priorities['2'].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-question-circle"
          title="NORMAL"
          count={
            this.state.priorities['3'] ? this.state.priorities['3'].count : 0
          }
          color="success"
          priority={
            this.state.priorities['3'] && this.state.priorities['3'].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-safety"
          title="INFO"
          count={
            this.state.priorities['4'] ? this.state.priorities['4'].count : 0
          }
          color="primary"
          priority={
            this.state.priorities['4'] && this.state.priorities['4'].priority
          }
        />
      </>
    );
  }
}

export default PriorityList;
