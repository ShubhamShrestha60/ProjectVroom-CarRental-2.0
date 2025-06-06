import "./profile.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [BookingDetails, setBookingDetails] = useState(null);
    const [CarDetails, setCarDetails] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [askDeletion, setAskDeletion] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [cancellationMessage, setCancellationMessage] = useState(false);
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3002/bookingDetails', { email: email });
                setBookingDetails(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
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
    

    const handleConfirmBooking = () => {
        setShowConfirmation(false);
        handleLogout();
    };


    const getStatus = (pickupDate, dropoffDate) => {
        const now = new Date();
        const pickupDateTime = new Date(pickupDate);
        const dropoffDateTime = new Date(dropoffDate);

        if (now < pickupDateTime) {
            return 'Not Started';
        } else if (now >= pickupDateTime && now < dropoffDateTime) {
            return 'Ongoing';
        } else {
            return 'Completed';
        }
    };
   
    const handleAskDeletion = (bookingID) => {
        setAskDeletion(true);
        setBookingToDelete(bookingID);
    };

    const handleCancelBooking = async () => {
        try {
            const response = await axios.delete(`http://localhost:3002/cancelBooking/${bookingToDelete}`);
            console.log(response.data.message);
            setAskDeletion(false);
            setCancellationMessage(true);
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    const handleAcknowledgeCancellation = () => {
        setCancellationMessage(false);
    };
    
    return (
        <div className="profile_main">
            <div className="car_rented">
                <h2 style={{textDecoration:"underline"}}>Booked Cars</h2>
                {CarDetails.length > 0 ? (
                    <div className="zero">
                        {CarDetails.map((car, index) => (
                            <div key={index} className="bookingcarDetail">
                            
                                <img
                                    // style={styles.img}
                                    src={`http://localhost:3002/${car.imageUrl}`}
                                    alt={`Image of ${car.brand}`}
                                />
                                <p>Brand: {car.brand}</p>
                                <p>Price: {car.price}/day</p>

                                {BookingDetails && BookingDetails[index] && (
                                    <div>
                                        <p>Status: {getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate)}</p>
                                        {getStatus(BookingDetails[index].pickupDate, BookingDetails[index].dropoffDate) === 'Not Started' && (
                                            <button className="booking_delete" onClick={() => handleAskDeletion(BookingDetails[index].bookingID)}>Cancel Booking</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No cars yet</p>
                )}
            </div>

            <div className="logout">
                <h2 style={{textDecoration:"underline"}}>Do you want to logout?</h2>
                <button onClick={() => setShowConfirmation(true)} className='logout_submit'>Logout</button>

                {showConfirmation && (
                    <div className="logout_confirmation_popup">
                        <p>Are you sure you want to Logout?</p>
                        <div className='logout_option'>
                            <button onClick={(e) => handleConfirmBooking(e)} style={{width:"100px"}}>Yes</button>
                            <button onClick={() => setShowConfirmation(false)} style={{width:"100px"}}>No</button>
                        </div>
                    </div>
                )}
             
                {askDeletion && (
                    <div className="logout_confirmation_popup">
                        <p>Cancel the booking?</p>
                        <div className='logout_option'>
                            <button onClick={handleCancelBooking} style={{ width: "55px" }}>Yes</button>
                            <button onClick={() => setAskDeletion(false)} style={{ width: "55px"}}>No</button>
                        </div>
                    </div>
                )}
               
                {cancellationMessage && (
                    <div className="cancellation_message">
                        <p>Booking has been cancelled</p>
                        <div className='option'>
                            <button onClick={handleAcknowledgeCancellation} style={{ width: "55px" }}>Ok</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
