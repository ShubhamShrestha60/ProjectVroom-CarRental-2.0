
// import './booking.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "../Login&Signup/logo.png";



export default function Booking(){
    const navigate = useNavigate();
    const location = useLocation();
    const carID = location.state.carID;

    const [image, setImage] = useState(null);
    const currentDate = new Date();
    const [pickupDate, setPickupDate] = useState(currentDate);

    const defaultPickupTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const [pickupTime, setPickupTime] = useState(defaultPickupTime);

    const [dropoffDate, setDropoffDate] = useState(currentDate);

 
    const defaultDropoffHour = currentDate.getHours() === 23 ? 0 : currentDate.getHours() + 1; 
    const defaultDropoffTime = `${defaultDropoffHour.toString().padStart(2, '0')}:00`;
    const [dropoffTime, setDropoffTime] = useState(defaultDropoffTime);

    const [showPickupCalendar, setShowPickupCalendar] = useState(false);
    const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
    const [showPickupTimetable, setShowPickupTimetable] = useState(false);
    const [showDropoffTimetable, setShowDropoffTimetable] = useState(false);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        // Fetch available times and filter out past times
        const fetchAvailableTimes = async () => {
            const availableTimes = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();
            const currentHourIndex = currentHour * 60 + currentMinute;
            const filteredTimes = availableTimes.filter(time => {
                const [hour, minute] = time.split(':');
                const timeIndex = parseInt(hour) * 60 + parseInt(minute);
                return timeIndex >= currentHourIndex; // Only allow times from now onwards
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

    
    const [timeGapError, setTimeGapError] = useState(""); 

    const [value, setValue] = useState("");
    const [expiryDate, setexpiryDate] = useState("");
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^[0-9-]*$/; // Regular expression to allow numbers and certain special characters
        
        // If the input matches the regular expression or it's an empty string, update the state
        if (regex.test(inputValue) || inputValue === "") {
            setValue(inputValue);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

      const handleExpiryDateChange = (e) => {
        const ExpiryDateValue = e.target.value;
        setexpiryDate(ExpiryDateValue);
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
        // Create FormData object to append form data
        const formData = new FormData();
        const userEmail = localStorage.getItem('userEmail');
        const pickupLocation = localStorage.getItem('pickupLocation');
        const dropoffLocation = localStorage.getItem('dropoffLocation');
       
        const pickupDateString = pickupDate.toISOString(); // Ensure pickupDate is a Date object
        const dropoffDateString = pickupDate.toISOString(); // Ensure dropoffDate is a Date object
        
        formData.append('email',userEmail);
        formData.append('carID', carID);
        formData.append('pickupLocation',pickupLocation)
        formData.append('dropoffLocation',dropoffLocation)
        formData.append('pickupDate', pickupDateString);  // Format date as ISO string
       formData.append('pickupTime', pickupTime);
       formData.append('dropoffDate', dropoffDateString); 
       formData.append('dropoffTime', dropoffTime);
       formData.append('LicenseNumber', value.toString()); // Convert to string if necessary
       formData.append('ExpiryDate', expiryDate);
        formData.append('image', image); 
        
        try {
            const response = await fetch('http://localhost:3002/booking', { 
                method: 'POST',
                body: formData,
            });
    
          if (response.ok) {
             const data = await response.json();
             setBookingConfirmed(true);
          console.log('Booking successfully:', data.booking);
        //   setShowConfirmation(true);
          } else {
              console.error('Booking Failed:', response.statusText);
          }
      } catch (error) {
          console.error('Booking Failed:', error.message);
      }

     
    //   setShowConfirmation(true);
      
    };


    const handleError =()=>{

        const pickupDateTime = new Date(`${pickupDate.toDateString()} ${pickupTime}`);
        const dropoffDateTime = new Date(`${dropoffDate.toDateString()} ${dropoffTime}`);
     
        if (pickupDateTime >= dropoffDateTime) {
            setTimeGapError("Dropoff time must be later than pickup time");
            return;
        } else {
            setTimeGapError(""); 
        }

        const timeDifference = Math.abs(dropoffDateTime - pickupDateTime) / (1000 * 60 * 60); 

        if (timeDifference < 1) {
            setTimeGapError("There must be at least one hour between pickup and dropoff");
        return;

        } else {
            setTimeGapError(""); 
        }

    // setShowConfirmation(false); 
    if (!value || !expiryDate || !image) {
        setShowEmptyFieldPopup(true); // Show popup if any field is empty
        setShowConfirmation(false);
        return;
    }
    else{
        setShowConfirmation(true);
    }

    }

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEmptyFieldPopup, setShowEmptyFieldPopup] = useState(false);

    const handleConfirmBooking = async (e) => {
        e.preventDefault();

        setShowConfirmation(false);
        await handleSubmit(e); 
        
        return;    
    };
    const handleOKButtonClick = () => {
        setBookingConfirmed(false);
    };

    return (

        <div style={styles.container}>
            
            <div style={styles.form} >
            <img src={logo} alt="" style={styles.img} />
            <h2>Pickup Information</h2>
                <div className='pickup_info' style={styles.pickup_info}>
                
                <div style={styles.pickup} className="pickup">
                    
                        <button onClick={togglePickupCalendar} className="button pickupdate"style={styles.button}>
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Pickup date</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{pickupDate.toLocaleDateString()}</h4>
                        </button>
                        {showPickupCalendar && (
                            <div className="calendarContainer" style={styles.calendarContainer}>
                                 <Calendar
                                    onChange={handlePickupDateChange}
                                    value={pickupDate}
                                    minDate={currentDate}
                                />
                            </div>
                        )}
                        
                        <button onClick={togglePickupTimetable} className="button pickuptime" style={styles.button}>
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Pickup time</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{pickupTime}</h4>
                        </button>
                        {showPickupTimetable && (
                            <div className="dropdown" style={styles.dropdown}>
                                {times.map((time, index) => (
                                    <div key={index} onClick={() => handlePickupTimeChange(time)}>
                                        {time}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div style={styles.dropoff} className="dropoff">
                        <button onClick={toggleDropoffCalendar} className="button dropoffdate" style={styles.button}>
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"9px"}}>Dropoff date</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{dropoffDate.toLocaleDateString()}</h4>
                        </button>
                        {showDropoffCalendar && (
                            <div className="calendarContainer" style={styles.calendarContainer}>
                                <Calendar
                                    onChange={handleDropoffDateChange}
                                    value={dropoffDate}
                                    minDate={pickupDate}
                                />
                            </div>
                        )}

                       <button onClick={toggleDropoffTimetable} className="button dropofftime" style={styles.button}>
                        <p style={{ margin: "auto 0", marginTop: "8px" , fontSize:"8px"}}>Dropoff time</p>
                            <h4 style={{ margin: "auto 0", marginTop: "14px" }}>{dropoffTime}</h4>

                        </button>
                        {showDropoffTimetable && (
                            <div className="dropdown" style={styles.dropdown}>
                                {times.map((time, index) => (
                                    <div key={index} onClick={() => handleDropoffTimeChange(time)}>
                                        {time}
                                    </div>
                                ))}
                            </div>
                        )}
                         {timeGapError && <p className="timegap_error_message" style={styles.timegap_error_message}>{timeGapError}</p>} 
                    </div>
                    </div>

                    <div className='driving_detail' style={styles.driving_detail}>

                      <h3>Driving Information</h3>

                        {/* <div className='writing_field'> */}

                       <div className='license' style={styles.license}>
                       <input
                              type="text"
                              value={value}
                              onChange={handleInputChange}
                              placeholder="DL number"
                              id="licenseNumber" 
                              name="licenseNumber"
                              style={styles.input}
                              
                         />
                         <input type="date" placeholder="dd/mm/yyyy"  style={styles.input} id="expiryDate" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange}/>
                         
                       </div>

                        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} style={styles.upload}  />
                        <button onClick={handleError} className='submit' style={styles.submit}>Rent Now</button>
              

          
          {showEmptyFieldPopup && (
    <div className="confirmation_popup" style={styles.confirmation_popup}>
        <p>Please fill all the fields.</p>
        <button onClick={() => setShowEmptyFieldPopup(false)} style={{width:"70px", marginTop:"15px"}}>OK</button>
    </div>
           )}
              
            {showConfirmation &&(
    <div className="confirmation_popup" style={styles.confirmation_popup}>
        <p>Do you want to confirm the booking?</p>
        <div className='option' style={styles.option}>
            <button onClick={(e) => handleConfirmBooking(e)} style={{width:"50%"}}>Yes</button>
            <button onClick={() => setShowConfirmation(false)} style={{width:"50%"}}>No</button>
        </div>
    </div>
         )}
               
               {!showEmptyFieldPopup && !timeGapError && bookingConfirmed && (
    <div className="confirmation_popup" style={styles.confirmation_popup}>
        <h4>Your booking has been confirmed.</h4>
        <button onClick={handleOKButtonClick} style={{width:"70px", marginTop:"15px"}}>OK</button>
    </div>
)}
                    </div>
            </div>
        </div>
    );

}