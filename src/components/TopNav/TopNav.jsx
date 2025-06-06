import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import profileImg from "../../assets/images/profile-02.png";
import "./top-nav.css";

const TopNav = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications] = useState([
        {
            id: 1,
            message: "New booking request received",
            time: "5 minutes ago"
        },
        {
            id: 2,
            message: "Car #1234 has been returned",
            time: "1 hour ago"
        }
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    const handleLogout = () => {
        // Implement logout functionality
        window.location.href = '/adminLogin';
    };

    return (
        <div className="top__nav">
            <div className="top__nav-wrapper">
                <form className="search__box" onSubmit={handleSearch}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className="top__nav-right">
                    <div className="notification">
                        <FaBell />
                        {notifications.length > 0 && (
                            <span className="badge">{notifications.length}</span>
                        )}
                    </div>

                    <div className="profile">
                        <img src={profileImg} alt="profile" />
                        
                        <div className="profile__dropdown">
                            <Link to="/profile" className="profile__dropdown-item">
                                <FaUser />
                                Profile
                            </Link>
                            <Link to="/settings" className="profile__dropdown-item">
                                <FaCog />
                                Settings
                            </Link>
                            <button onClick={handleLogout} className="profile__dropdown-item">
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
