import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { 
    FaCar, 
    FaTachometerAlt, 
    FaCalendarCheck, 
    FaList,
    FaPlus,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";
import "./sidebar.css";

const menuItems = [
    {
        category: "Overview",
        items: [
            {
                path: "/dashboard",
                icon: <FaTachometerAlt />,
                display: "Dashboard"
            }
        ]
    },
    {
        category: "Car Management",
        items: [
            {
                path: "/carmanagement",
                icon: <FaList />,
                display: "View Cars"
            },
            {
                path: "/addCar",
                icon: <FaPlus />,
                display: "Add Car"
            },
            {
                path: "/available",
                icon: <FaCar />,
                display: "Available Cars"
            }
        ]
    },
    {
        category: "Bookings",
        items: [
            {
                path: "/adminbookings",
                icon: <FaCalendarCheck />,
                display: "Manage Bookings"
            }
        ]
    }
];

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        // Implement logout functionality
        window.location.href = '/adminLogin';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`sidebar__overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}></div>
            
            <div className={`sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
                <div className="sidebar__top">
                    <Link to="/dashboard" className="sidebar__logo">
                        <span className="sidebar__logo-icon">
                            <FaCar />
                        </span>
                        <span className="sidebar__logo-text">Vroom</span>
                    </Link>
                </div>

                <div className="sidebar__content">
                    <nav className="menu">
                        {menuItems.map((menuGroup, index) => (
                            <div key={index} className="menu__category">
                                <span className="menu__category-label">{menuGroup.category}</span>
                                <ul className="nav__list">
                                    {menuGroup.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="nav__item">
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) => 
                                                    isActive ? "nav__link nav__active" : "nav__link"
                                                }
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.icon}
                                                <span>{item.display}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    <div className="sidebar__bottom">
                        <button onClick={handleLogout} className="logout__button">
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;