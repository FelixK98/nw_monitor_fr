import React from 'react';
import PriorityItem from './PriorityItem';
import { getPriorityCount, getPriorityDetail } from '../../../apis/event';
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
  onDetailClick = async (priority) => {
    let priorityTitle = '';
    switch (priority) {
      case 1:
        priorityTitle = 'DANGER ALERT DETAIL';
        break;
      case 2:
        priorityTitle = 'WARNING ALERT DETAIL';
        break;
      case 3:
        priorityTitle = 'NORMAL ALERT DETAIL';
        break;
      default:
        priorityTitle = 'SAFE ALERT DETAIL';
        break;
    }
    const detail = await getPriorityDetail(priority);

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
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-stop"
          title="SERIOUS"
          count={this.state.priorities[0] && this.state.priorities[0].count}
          color="danger"
          priority={
            this.state.priorities[0] && this.state.priorities[0].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-warning"
          title="WARNING"
          count={this.state.priorities[1] && this.state.priorities[1].count}
          color="warning"
          priority={
            this.state.priorities[1] && this.state.priorities[1].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-question-circle"
          title="NORMAL"
          count={this.state.priorities[2] && this.state.priorities[2].count}
          color="success"
          priority={
            this.state.priorities[2] && this.state.priorities[2].priority
          }
        />
        <PriorityItem
          onClick={this.onDetailClick}
          icon="anticon anticon-safety"
          title="INFO"
          count={0}
          color="primary"
          priority={
            this.state.priorities[3] && this.state.priorities[3].priority
          }
        />
      </>
    );
  }
}

export default PriorityList;
