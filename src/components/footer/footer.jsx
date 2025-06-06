import React from 'react';
import { useLocation } from 'react-router-dom'; 
import "./footer.css";

export const Footer = () => {
  const location = useLocation();
  // Define an array of paths where you want to hide the footer
  const hiddenPaths = ['/login', '/signup', '/dashboard','/settings','/addCar','/adminlogin','/adminSignup','/adminsignup','/adminLogin','/booking','/adminbookings','/available','/notification','/carmanagement'];

  // Check if the current location is in the array of hidden paths
  const isHidden = hiddenPaths.includes(location.pathname);

  // If the current path is in the hiddenPaths array, don't render the footer
  if (isHidden) {
    return null;
  }
  return (
    <div className='footer_main'>
    <footer className="footer">
      <div className="container">
        <div className="left-content">
          <h2 style={{color:"white"}}>Vroom</h2>
          <p className="sub-text">YOUR TRUSTED CAR RENTAL.</p> 
        </div>
        <div className="right-content">
          <div className="footer-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </footer>
    </div>
  );
} 
export default Footer;