import React, { useState } from "react";
import "./Navbar.css";
import PropTypes from 'prop-types'; // Import PropTypes
import { Link, NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom'; 

export const Navbar = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const hiddenPaths = ['/login', '/signup', '/dashboard','/settings','/addCar','/adminlogin','/adminSignup','/adminsignup','/adminLogin','/booking','/adminbookings','/available','/notification','/carmanagement'];

  // Check if the current location is in the array of hidden paths
  const isHidden = hiddenPaths.includes(location.pathname);

  // If the current path is in the hiddenPaths array, don't render the footer
  if (isHidden) {
    return null;
  }

  return (
    <div className="main_header">
    <nav className="nav-container">
      <Link to="/" className="title">
        Vroom
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        
        <li>
          <NavLink to="/home#guide">How it works?</NavLink>
        </li>
        {isLoggedIn ? ( // Render profile if user is logged in
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          ) : (
            <li>
              <p><Link to="/login">Login/Signup</Link></p>
            </li>
          )}
      </ul>
    </nav>
    </div>
  );
};
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Navbar;