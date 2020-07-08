import React from 'react';
import AlertTable from './AlertTable';
import ExportExcel from './ExportExcel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllEvents, getEventByDate } from '../../apis/event';

class Content extends React.Component {
  state = { startDateTime: '', endDateTime: '', events: [] };
  filterDate = async () => {
    const startDateTime =
      this.state.startDateTime && this.state.startDateTime.toISOString();
    const endDateTime =
      this.state.endDateTime && this.state.endDateTime.toISOString();
    if (startDateTime && endDateTime) {
      const events = await getEventByDate(startDateTime, endDateTime);
      this.setState({ events });
    }
  };
  onChangeStartDate = (startDateTime) => {
    this.setState({ startDateTime });

    this.filterDate();
  };
  onChangeEndDate = (endDateTime) => {
    endDateTime.setHours(endDateTime.getHours() + 7);
    this.setState({ endDateTime });
    this.filterDate();
  };
  async componentDidMount() {
    const events = await getAllEvents();
    this.setState({ events });
  }
  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-4 text-gray-800">Events</h1>
        <div>
          <div className="row">
            <div className="col-md-3">
              <span>FROM:</span>
              <DatePicker
                selected={this.state.startDateTime}
                onChange={this.onChangeStartDate}
                calendarClassName="rasta-stripes"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy-MM-dd HH:mm:ss"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <span>TO:</span>
              <DatePicker
                selected={this.state.endDateTime}
                onChange={this.onChangeEndDate}
                calendarClassName="rasta-stripes"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy-MM-dd HH:mm:ss"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <ExportExcel data={this.state.events} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <AlertTable events={this.state.events} />
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
