import React from 'react';

class AccountInfo extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            <span className="badge badge-pill badge-secondary">
              {this.props.userInfo.isAdmin ? 'ADMIN' : 'USER'}
            </span>
          </h4>

          <div className="table-responsive">
            <table className="product-info-table m-t-20">
              <tbody>
                <tr>
                  <td>Id:</td>
                  <td className="text-dark font-weight-semibold">
                    {this.props.userInfo.id}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{this.props.userInfo.email}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{this.props.userInfo.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountInfo;
