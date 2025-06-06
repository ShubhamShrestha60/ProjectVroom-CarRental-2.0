// import './booking.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../Login&Signup/logo.png";
import './booking.css';



export default function Booking(){
    const navigate = useNavigate();
    const location = useLocation();
    const carID = location.state.carID;

    const [image, setImage] = useState(null);
    const currentDate = new Date();
    const [pickupDate, setPickupDate] = useState(currentDate);
    const [dropoffDate, setDropoffDate] = useState(currentDate);

    const defaultPickupTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const [pickupTime, setPickupTime] = useState(defaultPickupTime);

    const defaultDropoffHour = currentDate.getHours() === 23 ? 0 : currentDate.getHours() + 1; 
    const defaultDropoffTime = `${defaultDropoffHour.toString().padStart(2, '0')}:00`;
    const [dropoffTime, setDropoffTime] = useState(defaultDropoffTime);

    const [showPickupCalendar, setShowPickupCalendar] = useState(false);
    const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
    const [showPickupTimetable, setShowPickupTimetable] = useState(false);
    const [showDropoffTimetable, setShowDropoffTimetable] = useState(false);
    const [times, setTimes] = useState([]);
    const [licenseNumber, setLicenseNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [timeGapError, setTimeGapError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEmptyFieldPopup, setShowEmptyFieldPopup] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            const availableTimes = Array.from({ length: 24 }, (_, i) => 
                `${i.toString().padStart(2, '0')}:00`
            );
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();
            const currentHourIndex = currentHour * 60 + currentMinute;
            const filteredTimes = availableTimes.filter(time => {
                const [hour] = time.split(':');
                const timeIndex = parseInt(hour) * 60;
                return timeIndex >= currentHourIndex;
            });
            setTimes(filteredTimes);
        };

        fetchAvailableTimes();
    }, []);

    const togglePickupCalendar = () => {
        setShowPickupCalendar(!showPickupCalendar);
    };

    const toggleDropoffCalendar = () => {
        setShowDropoffCalendar(!showDropoffCalendar);
    };

    const togglePickupTimetable = () => {
        setShowPickupTimetable(!showPickupTimetable);
    };

    const toggleDropoffTimetable = () => {
        setShowDropoffTimetable(!showDropoffTimetable);
    };

    const handlePickupDateChange = (date) => {
        setPickupDate(date);
        setDropoffDate(date); 
        togglePickupCalendar();
    };

    const handleDropoffDateChange = (date) => {
        setDropoffDate(date);
        toggleDropoffCalendar();
    };

    const handlePickupTimeChange = (time) => {
        setPickupTime(time);
        togglePickupTimetable();
    };

    const handleDropoffTimeChange = (time) => {
        setDropoffTime(time);
        toggleDropoffTimetable();
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^[0-9-]*$/; // Regular expression to allow numbers and certain special characters
        
        // If the input matches the regular expression or it's an empty string, update the state
        if (regex.test(inputValue) || inputValue === "") {
            setLicenseNumber(inputValue);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

    const handleExpiryDateChange = (e) => {
        const ExpiryDateValue = e.target.value;
        setExpiryDate(ExpiryDateValue);
    }

    const styles = {
        
        container: {
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
            // marginTop:"20px",
            height: '100vh',
            
        },
        form: {
            width: '400px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        
        pickup_info:{
            display:"grid",
            gridTemplateRows:"1fr 1fr",
            gap:"20px",
            width:"100%",
            marginTop:"20px"
        },
        img: {
            width: "100%",
            height: "auto",
            marginBottom: "15px",
          },
        pickup:{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            position: 'relative' 
        },
        dropoff:{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            position: 'relative' 
        },
        button:{
            backgroundColor:"maroon",
            width:"180px",
            color:"white",
            
        },
        dropdown:{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: "0.5vw",
            zIndex: "1000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "5px",
            width: "180px",
            maxHeight: "150px",
            overflowY: "auto",
            cursor: "pointer",
            color: "red",
        },
        
        calendarContainer:{
            position: "absolute",
            top: "calc(100% + 10px)",
            zIndex: "1000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "5px",
            width: "300px", // Adjust the width of the calendar container
            height: "250px", // Adjust the height of the calendar container
            overflowY: "auto",
            cursor: "pointer",

           
        },

        driving_detail:{
            marginTop:"20px",
            display:"grid",
            gridTemplateRows:"1fr 1fr",

        },
        license:{
            display:"flex",
            height:"30px",
            gap:"20px",
            marginTop:"10px"
        },
        input:{
            
            flex:"1",
            gap:"20px"
        },
        upload:{
            marginTop:"10px"
        },
        submit:{
            backgroundColor:"maroon",
            width:"100%",
            marginTop:"20px",
            height:"50px",
            color:"white"
        },
        confirmation_popup:{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
        },
        option:{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            marginTop:"20px"
        },
        timegap_error_message:{
            position:"absolute",
            top: "calc(110%)",
           fontSize: "14px",
            zIndex: "1000",
            color: "red",
            fontFamily: "'Poppins', sans-serif",
            width: "20vw",
            right: "3px"
        }
            

    };
     

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const userEmail = localStorage.getItem('userEmail');
        const pickupLocation = localStorage.getItem('pickupLocation');
        const dropoffLocation = localStorage.getItem('dropoffLocation');

        const pickupDateTime = new Date(pickupDate);
        pickupDateTime.setHours(...pickupTime.split(':'));
        const dropoffDateTime = new Date(dropoffDate);
        dropoffDateTime.setHours(...dropoffTime.split(':'));

        formData.append('email', userEmail);
        formData.append('carID', carID);
        formData.append('pickupLocation', pickupLocation);
        formData.append('dropoffLocation', dropoffLocation);
        formData.append('pickupDate', pickupDateTime.toISOString());
        formData.append('dropoffDate', dropoffDateTime.toISOString());
        formData.append('LicenseNumber', licenseNumber);
        formData.append('ExpiryDate', expiryDate);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:3002/booking', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Booking successful:', data.booking);
                setBookingConfirmed(true);
            } else {
                console.error('Booking Failed:', response.statusText);
            }
        } catch (error) {
            console.error('Booking Failed:', error.message);
        }
    };

    const validateBooking = () => {
        const pickupDateTime = new Date(`${pickupDate.toDateString()} ${pickupTime}`);
        const dropoffDateTime = new Date(`${dropoffDate.toDateString()} ${dropoffTime}`);

        if (pickupDateTime >= dropoffDateTime) {
            setTimeGapError("Dropoff time must be later than pickup time");
            return false;
        }

        const timeDifference = Math.abs(dropoffDateTime - pickupDateTime) / (1000 * 60 * 60);
        if (timeDifference < 1) {
            setTimeGapError("There must be at least one hour between pickup and dropoff");
            return false;
        }

        if (!licenseNumber || !expiryDate || !image) {
            setShowEmptyFieldPopup(true);
            return false;
        }

        setTimeGapError("");
        return true;
    };

    const handleBookingClick = () => {
        if (validateBooking()) {
            setShowConfirmation(true);
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-form">
                <img src={logo} alt="Vroom Logo" className="booking-logo" />
                <h2 className="booking-title">Complete Your Booking</h2>

                <div className="booking-section">
                    <h3>Pickup & Return Details</h3>
                    <div className="datetime-grid">
                        <button 
                            className="datetime-button"
                            onClick={() => setShowPickupCalendar(!showPickupCalendar)}
                        >
                            <p>Pickup Date</p>
                            <h4>{pickupDate.toLocaleDateString()}</h4>
                            {showPickupCalendar && (
                                <div className="calendar-container">
                                    <Calendar
                                        onChange={date => {
                                            setPickupDate(date);
                                            setDropoffDate(date);
                                            setShowPickupCalendar(false);
                                        }}
                                        value={pickupDate}
                                        minDate={currentDate}
                                    />
                                </div>
                            )}
                        </button>

                        <button 
                            className="datetime-button"
                            onClick={() => setShowPickupTimetable(!showPickupTimetable)}
                        >
                            <p>Pickup Time</p>
                            <h4>{pickupTime}</h4>
                            {showPickupTimetable && (
                                <div className="time-dropdown">
                                    {times.map((time, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => {
                                                setPickupTime(time);
                                                setShowPickupTimetable(false);
                                            }}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>

                        <button 
                            className="datetime-button"
                            onClick={() => setShowDropoffCalendar(!showDropoffCalendar)}
                        >
                            <p>Return Date</p>
                            <h4>{dropoffDate.toLocaleDateString()}</h4>
                            {showDropoffCalendar && (
                                <div className="calendar-container">
                                    <Calendar
                                        onChange={date => {
                                            setDropoffDate(date);
                                            setShowDropoffCalendar(false);
                                        }}
                                        value={dropoffDate}
                                        minDate={pickupDate}
                                    />
                                </div>
                            )}
                        </button>

                        <button 
                            className="datetime-button"
                            onClick={() => setShowDropoffTimetable(!showDropoffTimetable)}
                        >
                            <p>Return Time</p>
                            <h4>{dropoffTime}</h4>
                            {showDropoffTimetable && (
                                <div className="time-dropdown">
                                    {times.map((time, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => {
                                                setDropoffTime(time);
                                                setShowDropoffTimetable(false);
                                            }}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>
                    </div>
                    {timeGapError && <p className="error-message">{timeGapError}</p>}
                </div>

                <div className="booking-section">
                    <h3>Driver Information</h3>
                    <div className="license-grid">
                        <input
                            type="text"
                            value={licenseNumber}
                            onChange={handleInputChange}
                            placeholder="License Number"
                            className="input-field"
                        />
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            className="input-field"
                            placeholder="License Expiry Date"
                        />
                    </div>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="file-input"
                    />
                </div>

                <button onClick={handleBookingClick} className="submit-button">
                    Complete Booking
                </button>
            </div>

            {showEmptyFieldPopup && (
                <div className="popup">
                    <h3 className="popup-title">Missing Information</h3>
                    <p>Please fill in all required fields to continue.</p>
                    <div className="popup-buttons">
                        <button 
                            className="popup-button"
                            onClick={() => setShowEmptyFieldPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="popup">
                    <h3 className="popup-title">Confirm Booking</h3>
                    <p>Are you sure you want to proceed with the booking?</p>
                    <div className="popup-buttons">
                        <button 
                            className="popup-button primary"
                            onClick={handleSubmit}
                        >
                            Confirm
                        </button>
                        <button 
                            className="popup-button"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {bookingConfirmed && (
                <div className="popup">
                    <h3 className="popup-title">Booking Confirmed!</h3>
                    <p>Your car rental has been successfully booked.</p>
                    <div className="popup-buttons">
                        <button 
                            className="popup-button primary"
                            onClick={() => {
                                setBookingConfirmed(false);
                                navigate('/profile');
                            }}
                        >
                            View My Bookings
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}