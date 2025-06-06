import "./profile.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCar, FaSignOutAlt, FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const Profile = () => {
    const [BookingDetails, setBookingDetails] = useState(null);
    const [CarDetails, setCarDetails] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [askDeletion, setAskDeletion] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [cancellationMessage, setCancellationMessage] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3002/userDetails', { email: email });
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [email]);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:3002/bookingDetails', { email: email });
                setBookingDetails(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
            setIsLoading(false);
        };

        fetchBookingDetails();
    }, [email]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                if (BookingDetails && BookingDetails.length > 0) {
                    const bookedcarDetailsPromises = BookingDetails.map(async (booking) => {
                        const response = await axios.post('http://localhost:3002/bookedcarDetails', { carID: booking.carID });
                        return response.data;
                    });
                    const bookedcarDetails = await Promise.all(bookedcarDetailsPromises);
                    setCarDetails(bookedcarDetails);
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [BookingDetails]);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = '/home';
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        handleLogout();
    };

    const handleAskDeletion = (bookingID) => {
        setBookingToDelete(bookingID);
        setAskDeletion(true);
    };

    const handleCancelBooking = async () => {
        try {
            await axios.post('http://localhost:3002/cancelBooking', { bookingID: bookingToDelete });
            setAskDeletion(false);
            setCancellationMessage(true);
            // Refresh booking details after cancellation
            const response = await axios.post('http://localhost:3002/bookingDetails', { email: email });
            setBookingDetails(response.data);
            
            // Show success message and hide after 3 seconds
            setTimeout(() => {
                setCancellationMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    const getStatus = (pickupDate, dropoffDate) => {
        const now = new Date();
        const pickup = new Date(pickupDate);
        const dropoff = new Date(dropoffDate);

        if (now < pickup) return 'Not Started';
        if (now >= pickup && now <= dropoff) return 'Ongoing';
        return 'Completed';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Not Started':
                return <FaClock />;
            case 'Ongoing':
                return <FaCar />;
            case 'Completed':
                return <FaCheckCircle />;
            default:
                return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Not Started':
                return 'status-not-started';
            case 'Ongoing':
                return 'status-ongoing';
            case 'Completed':
                return 'status-completed';
            default:
                return '';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="profile_main">
            <div className="profile-header">
                <h1>Welcome{userDetails ? `, ${userDetails.firstName}` : ''}!</h1>
                <p>Manage your bookings and account settings here. View your rental history and upcoming reservations.</p>
            </div>

            <div className="car_rented">
                <h2 className="section-title">
                    <FaCar />
                    Your Bookings
                </h2>
                {isLoading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading your bookings...</p>
                    </div>
                ) : CarDetails.length > 0 ? (
                    <div className="zero">
                        {CarDetails.map((car, index) => (
                            <div key={index} className="bookingcarDetail">
                                <div className="car-image-container">
                                    <img
                                        src={`http://localhost:3002/${car.imageUrl}`}
                                        alt={`${car.brand}`}
                                    />
                                </div>
                                <div className="car-details">
                                    <div className="car-header">
                                        <div className="car-info">
                                            <h3 className="car-brand">{car.brand}</h3>
                                            <p className="car-price">Rs {car.price}/day</p>
                                        </div>
                                        {BookingDetails && BookingDetails[index] && (
                                            <span className={`booking-status ${getStatusClass(getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate))}`}>
                                                {getStatusIcon(getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate))}
                                                {getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate)}
                                            </span>
                                        )}
                                    </div>

                                    {BookingDetails && BookingDetails[index] && (
                                        <>
                                            <div className="booking-info">
                                                <div className="booking-dates">
                                                    <FaCalendarAlt />
                                                    {formatDate(BookingDetails[index].pickupDate)} - {formatDate(BookingDetails[index].dropoffDate)}
                                                </div>
                                            </div>
                                            {getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate) === 'Not Started' && (
                                                <button className="booking_delete" onClick={() => handleAskDeletion(BookingDetails[index].bookingID)}>
                                                    <FaTimesCircle /> Cancel Booking
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-bookings">
                        <p>You haven't made any bookings yet.</p>
                        <p>Start exploring our collection of premium cars and book your first ride!</p>
                    </div>
                )}
            </div>

            <div className="logout">
                <h2 className="section-title">
                    <FaSignOutAlt />
                    Account Settings
                </h2>
                <button onClick={() => setShowConfirmation(true)} className="logout_submit">
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {showConfirmation && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <FaSignOutAlt size={24} color="#666" />
                        <h3 className="popup-title">Confirm Logout</h3>
                        <p>Are you sure you want to logout from your account?</p>
                        <div className="popup-buttons">
                            <button className="popup-button primary" onClick={handleConfirmBooking}>
                                Yes, Logout
                            </button>
                            <button className="popup-button secondary" onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {askDeletion && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <FaTimesCircle size={24} color="#666" />
                        <h3 className="popup-title">Cancel Booking</h3>
                        <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                        <div className="popup-buttons">
                            <button className="popup-button primary" onClick={handleCancelBooking}>
                                Yes, Cancel Booking
                            </button>
                            <button className="popup-button secondary" onClick={() => setAskDeletion(false)}>
                                Keep Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {cancellationMessage && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <FaCheckCircle size={24} color="#059669" />
                        <h3 className="popup-title">Booking Cancelled</h3>
                        <p>Your booking has been successfully cancelled.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
