import React from 'react';
import { Link } from 'react-router-dom';

const SideMenuItem = ({
  name,
  link,
  hr = 'sidebar-divider my-0',
  icon = 'fa-user',
}) => {
  return (
    <>
      <li className="nav-item active">
        <Link className="nav-link" to={link}>
          <i className={`fas fa-fw ${icon}`}></i>
          <span>{name}</span>
        </Link>
      </li>
      <hr className={hr} />
    </>
  );
};
export default SideMenuItem;
