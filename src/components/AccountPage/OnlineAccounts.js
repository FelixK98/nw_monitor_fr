import React from 'react';

class OnlineAccounts extends React.Component {
  renderOnlineStatus(isOnline) {
    return isOnline ? (
      <span class="badge badge-success">Online</span>
    ) : (
      <span class="badge badge-grey">Offline</span>
    );
  }
  renderItem() {
    return (
      this.props.account &&
      this.props.account.map((account) => {
        return (
          <li class="list-group-item">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-image">
                <img src={account.img} alt="" />
              </div>
              <div class="m-l-10">
                <div class="m-b-0 text-dark font-weight-semibold">
                  {account.email}
                </div>
                <div class="m-b-0 opacity-07 font-size-13">
                  {this.renderOnlineStatus(account.isOnline)}
                </div>
              </div>
            </div>
          </li>
        );
      })
    );
  }
  render() {
    return (
      <div class="card">
        <div class="card-header border-bottom">
          <h4 class="card-title">Accounts</h4>
        </div>
        <div class="card-body p-0">
          <ul class="list-group list-group-flush">{this.renderItem()}</ul>
        </div>
      </div>
    );
  }
}

export default OnlineAccounts;
