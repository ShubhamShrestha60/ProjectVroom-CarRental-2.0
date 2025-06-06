import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/home/home';
import Login from './components/Login&Signup/login';
import Signup from './components/Login&Signup/signup';
import { Navbar } from "./components/Header/Navbar";
import { Footer } from "./components/footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import TopNav from "./components/TopNav/TopNav";

import Dashboard from "./components/pages/Dashboard";
import AddCar from "./components/pages/addCar";
import AdminLogin from "./components/admin/adminLogin";
import AdminSignup from "./components/admin/adminSignup";
import Cars from "./components/SearchResults/cars";
import Bookings from "./components/SearchResults/booking";
import Profile from "./components/user_profile/profile";
import Available from "./components/pages/available";
import Detail from "./components/SearchResults/detail";
import AdminBookings from "./components/pages/adminBookings";
import CarManagement from "./components/pages/carManagement";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ paddingLeft: "210px", paddingTop: "80px" }}>
      <Sidebar />
      <TopNav />
      {children}
    </div>
  );
};

export default function App() {
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedResults = localStorage.getItem("results");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        if (Array.isArray(parsedResults)) {
          setResults(parsedResults);
        } else {
          console.error("Stored results is not an array:", parsedResults);
        }
      } catch (error) {
        console.error("Error parsing stored results:", error);
      }
    }
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <main>
          <Routes>
            {/* Home pages without top padding */}
            <Route path="/" element={<Home setResults={setResults} />} />
            <Route path="/home" element={<Home setResults={setResults} />} />

            {/* Regular pages with top padding */}
            <Route path="/cars" element={<div style={{ paddingTop: "80px" }}><Cars results={results} /></div>} />
            <Route path="/detail/:carID" element={<div style={{ paddingTop: "80px" }}><Detail /></div>} />
            <Route path="/booking" element={<div style={{ paddingTop: "80px" }}><Bookings /></div>} />
            <Route path="/signup" element={<div style={{ paddingTop: "80px" }}><Signup /></div>} />
            <Route path="/login" element={<div style={{ paddingTop: "80px" }}><Login setIsLoggedIn={setIsLoggedIn}/></div>} />
            <Route path="/profile" element={<div style={{ paddingTop: "80px" }}><Profile /></div>} />
            <Route path="/adminSignup" element={<div style={{ paddingTop: "80px" }}><AdminSignup /></div>} />
            <Route path="/adminLogin" element={<div style={{ paddingTop: "80px" }}><AdminLogin /></div>} />
            
            {/* Admin pages with sidebar */}
            <Route path="/available" element={<AdminLayout><Available /></AdminLayout>} />
            <Route path="/carmanagement" element={<AdminLayout><CarManagement /></AdminLayout>} />
            <Route path="/adminbookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
            <Route path="/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
            <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/addcar" element={<AdminLayout><AddCar /></AdminLayout>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
