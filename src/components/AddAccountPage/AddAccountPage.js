import React from 'react';
import validator from 'validator';
import { addAccount } from '../../apis/account';
class AddAccountPage extends React.Component {
  state = { emailState: '', errMsg: 'Email is not valid' };

  onAddAccount = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    let errMsg = 'Email is not valid';
    let emailState = 'invalid';
    if (validator.isEmail(email)) {
      const result = await addAccount(email);
      if (result) {
        emailState = 'valid';
      } else {
        errMsg = 'Duplicate Email!!!';
      }
    }
    this.setState({ emailState, errMsg });
  };
  renderAlert() {
    switch (this.state.emailState) {
      case 'valid':
        return (
          <div className="alert alert-success">
            <div className="d-flex align-items-center justify-content-start">
              <span className="alert-icon">
                <i className="anticon anticon-info-o"></i>
              </span>
              <span>Add email successfully!!!</span>
            </div>
          </div>
        );
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
      default:
        return '';
    }
  }
  removeAlert = () => {
    this.setState({ emailState: '' });
  };
  render() {
    return (
      <>
        <div className="row m-3">
          <div className="card  col-md-5">
            <div className="card-header">
              <div className="card-title">ADD ACCOUNT</div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <form style={{ width: '100%' }} onSubmit={this.onAddAccount}>
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        onChange={this.removeAlert}
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div className="col-md-4">
                      <input
                        type="submit"
                        className="btn btn-primary btn-tone m-r-5"
                        value="Add"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-action">{this.renderAlert()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default AddAccountPage;
