import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";

const Sidebar = () => {
  const handleLogout = () => {
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>
          <span>
            <i className="ri-taxi-line"></i>
          </span>{" "}
          Vroom
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav_active navlink" : "nav_link"
                  }
                >
                  <i className={item.icon}></i>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          {/* Use NavLink directly for logout with 'to' prop */}
          <NavLink to="/adminlogin" className="nav__link" onClick={handleLogout}>
            <span>
              <i className="ri-logout-circle-r-line"></i> Logout
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;