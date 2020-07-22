import React from 'react';
import AccountInfo from './AccountInfo';

import { getUserInfo, getOnlineAccount } from '../../apis/authentication';
import OnlineAccounts from './OnlineAccounts';

class AccountPage extends React.Component {
  state = { userInfo: {}, onlineAccount: [] };

  async componentDidMount() {
    const userInfo = await getUserInfo();
    const onlineAccount = await getOnlineAccount();

    this.setState({ userInfo, onlineAccount });
  }

  render() {
    return (
      <>
        <div className="row m-3">
          <div className="col-md-4">
            <AccountInfo userInfo={this.state.userInfo} />
          </div>
          <div className="col-md-4">
            <OnlineAccounts account={this.state.onlineAccount} />
          </div>
        </div>
      </>
    );
  }
}

export default AccountPage;
