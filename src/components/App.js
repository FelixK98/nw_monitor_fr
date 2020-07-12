import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideMenu from './ComonPage/SideMenu';
import AlertPage from './AlertPage/AlertPage';
import Footer from './ComonPage/Footer';
import NavBar from './ComonPage/NavBar';
import NodeList from './NodePage/NodeList';
import NodeStatistic from './NodePage/NodeItemDetail/NodeStatistic';
import StatisticPage from './StatisticPage/StatisticPage';
import { getUserInfo } from '../apis/authentication';
import BlockListPage from './BlockListPage/BlockListPage';
import AccountPage from './AccountPage/AccountPage';
import AddAccountPage from './AddAccountPage/AddAccountPage';
import AddNodePage from './AddNodePage/AddNodePage';

class App extends React.Component {
  state = {
    userInfo: {},
  };

  componentDidMount = async () => {
    const userInfo = await getUserInfo();

    this.setState({ userInfo });
  };

  renderUserContent() {
    switch (this.state.userInfo.user_type) {
      case 'invalid':
        return (
          <div className="alert alert-danger">
            <div className="d-flex justify-content-start">
              <span className="alert-icon m-r-20 font-size-30">
                <i className="anticon anticon-close-circle"></i>
              </span>
              <div>
                <h5 className="alert-heading">{this.state.userType}</h5>
                <p>This Google Account doesn't exist in database</p>
              </div>
            </div>
          </div>
        );
      case 'valid':
        return (
          <Switch>
            <Route path="/" exact component={StatisticPage} />
            <Route path="/statistic" exact component={StatisticPage} />
            <Route path="/alert" exact component={AlertPage} />
            <Route path="/blocklist" exact component={BlockListPage} />
            <Route path="/account" exact component={AccountPage} />
            {this.state.userInfo.isAdmin && (
              <Route path="/addAccount" exact component={AddAccountPage} />
            )}
            {this.state.userInfo.isAdmin && (
              <Route path="/addNode" exact component={AddNodePage} />
            )}
            <Route path="/:network" exact component={NodeList} />
            <Route path="/node/:ip" exact component={NodeStatistic} />
          </Switch>
        );
      default:
        return (
          <div className="alert alert-warning">
            <div className="d-flex justify-content-start">
              <span className="alert-icon m-r-20 font-size-30">
                <i className="anticon anticon-exclamation-circle"></i>
              </span>
              <div>
                <h5 className="alert-heading">WARNING</h5>
                <p>
                  Please login by clicking the google button on the top right
                  side
                </p>
              </div>
            </div>
          </div>
        );
    }
  }
  renderInvalidMessage() {}
  render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <SideMenu isAdmin={this.state.userInfo.isAdmin} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <NavBar
                name={this.state.userInfo.name}
                isLogined={
                  this.state.userInfo.user_type === 'valid' ||
                  this.state.userInfo.user_type === 'invalid'
                }
                isValid={this.state.userInfo.user_type === 'valid'}
                img={this.state.userInfo.photo}
                link={
                  this.state.userInfo.user_type === 'valid' ||
                  this.state.userInfo.user_type === 'invalid'
                    ? 'logout'
                    : 'google'
                }
              />
              {this.renderUserContent()}
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
