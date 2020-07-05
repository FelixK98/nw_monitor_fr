import React from 'react';
import SideMenuItem from './SideMenuItem';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <SideMenuItem name="Alerts" link="/alert" icon="fa-bell" />
        <SideMenuItem name="Statistic" link="/statistic" icon="fa-chart-area" />
        <SideMenuItem name="LAN" link="/LAN" />

        <SideMenuItem name="MANAGEMENT" link="/MANAGEMENT" icon="fa-desktop" />

        <SideMenuItem name="DMZ" link="/DMZ" icon="fa-server" />
        {this.props.isAdmin && (
          <SideMenuItem
            name="Add Account"
            link="/addAccount"
            icon="anticon anticon-user-add"
          />
        )}
        {this.props.isAdmin && (
          <SideMenuItem
            name="Add Node"
            link="/addNode"
            icon="anticon anticon-file-add"
          />
        )}
        <SideMenuItem
          name="Block List"
          link="/blocklist"
          icon="anticon anticon-close-square"
          hr="sidebar-divider d-none d-md-block"
        />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    );
  }
}

export default SideMenu;
