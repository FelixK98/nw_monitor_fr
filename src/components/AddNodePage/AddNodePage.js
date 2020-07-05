import React from 'react';
import { addNode, getAllNodes } from '../../apis/local_nodes';

class AddNodePage extends React.Component {
  state = { isValid: '', errMsg: '', nodeCache: [] };

  fetchNodeCache = async () => {
    const nodeCache = await getAllNodes();
    this.setState({ nodeCache });
    console.log(this.state.nodeCache);
  };

  async componentDidMount() {
    this.fetchNodeCache();
  }
  isDuplicate = (ip, name) => {
    let isDuplicate = false;
    console.log(ip);
    this.state.nodeCache.forEach((item) => {
      if (ip === item.ip) {
        this.setState({ errMsg: 'Duplicate IP', isValid: 'invalid' });
        isDuplicate = true;
      } else if (name === item.name) {
        this.setState({ errMsg: 'Duplicate HostName', isValid: 'invalid' });
        isDuplicate = true;
      }
    });
  };
  isPredefinedIP(ip) {
    let isPredefinedIP = false;
    const predifinedIP = [
      '192.168.10.10',
      '192.168.20.20',
      '192.168.30.30',
      '192.168.40.40',
      '192.168.10.200',
      '192.168.20.200',
      '192.168.30.200',
      '192.168.40.200',
    ];
    if (predifinedIP.includes(ip)) {
      this.setState({ errMsg: 'Please choose another IP', isValid: 'invalid' });
      isPredefinedIP = true;
    }
    return isPredefinedIP;
  }
  isIPValid(ip) {
    let isIPValid = true;
    if (
      !ip.includes('192.168.20.') &&
      !ip.includes('192.168.30.') &&
      !ip.includes('192.168.40.')
    ) {
      isIPValid = false;
      this.setState({ errMsg: 'IP is not valid', isValid: 'invalid' });
    }

    return isIPValid;
  }
  handleAddNode = async () => {
    const ip = document.getElementById('ipInput').value;
    const name = document.getElementById('hostInput').value.toUpperCase();
    const type = document.getElementById('typeInput').value;
    let errMsg = '';
    let isDuplicate = this.isDuplicate(ip, name);
    if (isDuplicate) {
      return;
    }
    let isIPValid = this.isIPValid(ip);
    if (!isIPValid) {
      return;
    }
    let isPredefinedIP = this.isPredefinedIP(ip);
    if (isPredefinedIP) {
      return;
    }
    const result = await addNode(ip, name, type);

    const isValid = result.isValid;
    if (result.isValid === 'invalid') {
      errMsg = result.err;
    }
    this.setState({ isValid, errMsg });
    this.fetchNodeCache();
  };
  resetField = () => {
    this.setState({ isValid: '' });
  };
  renderAlert() {
    switch (this.state.isValid) {
      case 'invalid':
        return (
          <div className="alert alert-danger">
            <div className="d-flex align-items-center justify-content-start">
              <span className="alert-icon">
                <i className="anticon anticon-close-o"></i>
              </span>
              <span>{this.state.errMsg}</span>
            </div>
          </div>
        );
      case 'valid':
        return (
          <div className="alert alert-success">
            <div className="d-flex align-items-center justify-content-start">
              <span className="alert-icon">
                <i className="anticon anticon-check-o"></i>
              </span>
              <span>Add Successfully!!!</span>
            </div>
          </div>
        );
      default:
        return '';
    }
  }
  render() {
    return (
      <div className="row m-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">ADD NODE FORM</div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="squareInput">IP</label>
                <input
                  onClick={this.resetField}
                  type="text"
                  className="form-control input-square"
                  id="ipInput"
                  placeholder="IP INPUT"
                />
              </div>
              <div className="form-group">
                <label htmlFor="squareInput">Host Name</label>
                <input
                  onClick={this.resetField}
                  type="text"
                  className="form-control input-square"
                  id="hostInput"
                  placeholder="HOSTNAME INPUT"
                />
              </div>
              <div className="form-group mb-0">
                <label htmlFor="defaultSelect">TYPE</label>
                <select className="form-control form-control" id="typeInput">
                  <option>HOST</option>
                  <option>FIREWALL</option>
                  <option>WEB SERVER</option>
                </select>
                <hr />
              </div>
            </div>
            <div className="card-action  ">
              <div className="row mb-3 ml-4">
                <button
                  onClick={this.handleAddNode}
                  className="btn btn-primary btn-tone m-r-5 btn-lg"
                >
                  Add
                </button>
                <div className="col-md-6 font-weight-bold">
                  {this.renderAlert()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNodePage;
