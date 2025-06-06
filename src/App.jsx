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
        <Routes>
         <Route path="/" element = {<Home setResults={setResults} />}/>
         <Route path="/home" element = {<Home setResults={setResults} />}/>
         <Route
          path="/cars"
          element={<Cars results={results} />}
        />
        <Route path="/detail/:carID" element={<Detail />} />
        <Route path="/booking" element={<Bookings />} />
      
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login  setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/available" element={<AvailableLayout />} />
          <Route path="/carmanagement" element={<CarManagementLayout />} />
          <Route path="/adminbookings" element={<AdminBookingLayout />} />
          <Route path="/bookings" element={<AdminBookingLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/addcar" element={<AddCarLayout />} />
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const AdminBookingLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <AdminBookings />
    </>
  );
};
const AvailableLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Available />
    </>
  );
};
const CarManagementLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      < CarManagement/>
    </>
  );
};

const DashboardLayout = () => {

  return (
    <>
      <Sidebar />
      <TopNav />
      <Dashboard />
    </>
  );
};
const AddCarLayout = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <AddCar />
    </>
  );
};
