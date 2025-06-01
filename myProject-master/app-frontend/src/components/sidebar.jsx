import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <h5>ADMIN PANEL</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/"
          >
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/products"
          >
            Products
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/orders"
          >
            Orders
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;