import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = ({ name, isLogined, img, link, isValid }) => {
  // const onGoogleClick = () => {
  //   if (isLogined) {
  //     onSignOut();
  //   } else onSignIn();
  // };
  const buttonColor = isLogined ? 'primary' : 'danger';
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

        {/* <!-- Nav Item - Alerts --> */}
        <li className="nav-item">
          <a
            className="nav-link"
            href={`/auth/${link}`}
            data-toggle="tooltip"
            title={isLogined ? 'Log out' : 'Login'}
          >
            <button
              className={`btn btn-icon btn-${buttonColor} btn-rounded btn-tone `}
            >
              <i className="anticon anticon-google"></i>
            </button>
          </a>
        </li>

        {/* <!-- Nav Item - Messages --> */}

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <Link to="/account" className="nav-link dropdown-toggle">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {name}
            </span>

            <img
              style={{ height: '40px', width: '40px' }}
              className="img-profile rounded-circle"
              src={isValid ? img : require('../../img/guest.jpg')}
              alt=""
            />
          </Link>
          {/* <!-- Dropdown - User Information --> */}
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
