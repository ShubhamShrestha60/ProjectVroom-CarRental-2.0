import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import { FaCar, FaUserFriends, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCars: 0,
        activeBookings: 0,
        totalCustomers: 0,
        revenue: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const bookingsPerPage = 10;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch statistics
                const statsResponse = await axios.get('http://localhost:3002/dashboard/stats');
                setStats(statsResponse.data);

                // Fetch recent bookings
                const bookingsResponse = await axios.get(`http://localhost:3002/bookings?page=${currentPage}&limit=${bookingsPerPage}`);
                setRecentBookings(bookingsResponse.data);
                setTotalPages(Math.ceil(parseInt(bookingsResponse.headers['x-total-count'] || 0) / bookingsPerPage));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'status--active';
            case 'pending':
                return 'status--pending';
            case 'completed':
                return 'status--completed';
            default:
                return '';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ne-NP', {
            style: 'currency',
            currency: 'NPR'
        }).format(amount);
    };
    

    return (
        <div className="dashboard">
            <div className="dashboard__wrapper">
                <div className="dashboard__title">
                    <h2>Dashboard Overview</h2>
                    <p>Welcome to your dashboard. Here's what's happening with your car rental business.</p>
                </div>

                <div className="dashboard__cards">
                    <div className="single__card card--primary">
                        <div className="card__content">
                            <div className="card__icon">
                                <FaCar />
                            </div>
                            <span className="card__title">Total Cars</span>
                            <span className="card__value">{stats.totalCars}</span>
                        </div>
                    </div>

                    <div className="single__card card--success">
                        <div className="card__content">
                            <div className="card__icon">
                                <FaCalendarCheck />
                            </div>
                            <span className="card__title">Active Bookings</span>
                            <span className="card__value">{stats.activeBookings}</span>
                        </div>
                    </div>

                    <div className="single__card card--warning">
                        <div className="card__content">
                            <div className="card__icon">
                                <FaUserFriends />
                            </div>
                            <span className="card__title">Total Customers</span>
                            <span className="card__value">{stats.totalCustomers}</span>
                        </div>
                    </div>

                    <div className="single__card card--info">
                        <div className="card__content">
                            <div className="card__icon">
                                <FaChartLine />
                            </div>
                            <span className="card__title">Total Revenue</span>
                            <span className="card__value">{formatCurrency(stats.revenue)}</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard__table">
                    <div className="table__header">
                        <h3>Recent Bookings</h3>
                    </div>
                    <div className="table__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car</th>
                                    <th>Pickup Date</th>
                                    <th>Return Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking.email}</td>
                                        <td>{booking.carBrand}</td>
                                        <td>{formatDate(booking.pickupDate)}</td>
                                        <td>{formatDate(booking.dropoffDate)}</td>
                                        <td>{formatCurrency(booking.totalAmount)}</td>
                                        <td>
                                            <span className={`status ${getStatusClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;