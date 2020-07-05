import React from 'react';
import validator from 'validator';
import { addAccount } from '../../apis/authentication';
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
          <div class="alert alert-success">
            <div class="d-flex align-items-center justify-content-start">
              <span class="alert-icon">
                <i class="anticon anticon-info-o"></i>
              </span>
              <span>Add email successfully!!!</span>
            </div>
          </div>
        );
      case 'invalid':
        return (
          <div class="alert alert-danger">
            <div class="d-flex align-items-center justify-content-start">
              <span class="alert-icon">
                <i class="anticon anticon-close-o"></i>
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
        <div class="row m-3">
          <div class="card  col-md-5">
            <div class="card-header">
              <div class="card-title">ADD ACCOUNT</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <form style={{ width: '100%' }} onSubmit={this.onAddAccount}>
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        onChange={this.removeAlert}
                        id="email"
                        type="text"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div class="col-md-4">
                      <input
                        type="submit"
                        class="btn btn-primary btn-tone m-r-5"
                        value="Add"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-action">{this.renderAlert()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default AddAccountPage;
