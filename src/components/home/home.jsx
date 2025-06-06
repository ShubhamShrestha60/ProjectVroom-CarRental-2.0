import { useState } from "react";

import logo from "./card.png";
import logo1 from "./location.png";
import logo2 from "./car.png";
import logo3 from "./car.jpg"
import './home.css';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios'
import { useNavigate } from "react-router-dom";




export const Home = ({setResults}) => {
    

    const cities = ['kathmandu', 'pokhara', 'dang', 'dharan', 'jhapa', 'mahendranagar', 'butwal', 'karnali', 'koshi', 'lalitpur', 'bharatpur', 'bhaktapur'];

    const [pickupInput, setPickupInput] = useState("");
    const [pickupFilteredResults, setPickupFilteredResults] = useState([]);
    const [dropoffInput, setDropoffInput] = useState("");
    const [dropoffFilteredResults, setDropoffFilteredResults] = useState([]);
    
    const [pickupError, setPickupError] = useState(""); 
    const [dropoffError, setDropoffError] = useState(""); 
   

    const handleInputChange = (value, setterFunction, setFilteredResultsFunction) => {
        const lowercaseValue = value.toLowerCase();
        setterFunction(lowercaseValue);
        if (lowercaseValue.trim() === "") {
            setFilteredResultsFunction([]);
            return;
        }
        const filteredResults = cities.filter(city =>
            city.toLowerCase().includes(lowercaseValue)
        );
        setFilteredResultsFunction(filteredResults);
        // Clear the input field if there are no matching cities
        if (filteredResults.length === 0) {
            setterFunction(""); // Clear the input field
        }
    };

    const handleSuggestionClick = (value, setterFunction, setFilteredResultsFunction) => {
        setterFunction(value);
        setFilteredResultsFunction([]);
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pickupInput.trim() === "") {
            setPickupError("Pickup location cannot be empty");
            return;
        } else {
            setPickupError(""); 
        }

        if (dropoffInput.trim() === "") {
            setDropoffError("Dropoff location cannot be empty");
            return;
        } else {
            setDropoffError(""); 
        }

        axios.post('http://localhost:3002/home', { location: pickupInput })
            .then(result => {
                if (result.data && result.data.length > 0) {
                    setResults(result.data);
                    localStorage.setItem("results", JSON.stringify(result.data)); 
                    localStorage.setItem("dropoffLocation", dropoffInput ); 
                    localStorage.setItem("pickupLocation", pickupInput ); 
                    navigate('/cars');
                } 
                else if (result.data && result.data.message === "0 cars found") {
                    console.log("0 cars found for the specified location");
                    setResults([]); 
                    localStorage.setItem("results", JSON.stringify([])); 
                    navigate('/cars');
                } else {
                    console.log("Error: Invalid response from server");
                }
                
            })
            .catch(err => console.log(err));
    };



    return (
        
    <div className="main">
        
            <div className="search_main" style={{marginTop:"50px"}}>
                
                <h1 style={{maxWidth:"1200px", margin:"auto"}} >Car hire for any kind of trip</h1>
                <p style={{marginTop:"-20px",marginBottom:"40px", margin:"auto",maxWidth:"1200px"}}>Great deals at great prices</p>
                <div className="search">
                <input
                        type="text"
                        placeholder="Pick up location"
                        className="input"
                        required
                        value={pickupInput}
                        onChange={(e) => handleInputChange(e.target.value, setPickupInput, setPickupFilteredResults)}
                    />
                    {pickupError && <p className="pickup_error-message">{pickupError}</p>}
                    {pickupFilteredResults.length > 0 && (
                        <ul className="pickup_suggestions">
                            {pickupFilteredResults.map((city, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(city, setPickupInput, setPickupFilteredResults)}>
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type="text"
                        placeholder="Drop off location"
                        className="input"
                        value={dropoffInput}
                        onChange={(e) => handleInputChange(e.target.value, setDropoffInput, setDropoffFilteredResults)}
                    />
                    {dropoffError && <p className="dropoff_error-message">{dropoffError}</p>}
                    {dropoffFilteredResults.length > 0 && (
                        <ul className="dropoff_suggestions">
                            {dropoffFilteredResults.map((city, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(city, setDropoffInput, setDropoffFilteredResults)}>
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
    
                    <button className="search_button" onClick={handleSubmit}>
                        Search
                        
                    </button>
                </div>
            </div>

            <div className="guide_main">
            <div className="guide" id="#guide">
                <h3>How it works</h3>
                <div className="content">
                    <div>
                        
                        <img src={logo1} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Pickup and Dropoff</h3>
                        <p style={{margin:"0 0 0 11px"}}>Select the pickup and dropoff<br />
                           point according to your ease.
                           </p>
                        
                        
                    </div>
                    <div>
                    <img src={logo2} alt="" className="img" />
                    <h3 style={{margin:"-10px 0px 0px 11px"}}>Select the best car</h3>
                        <p style={{margin:"0 0 0 11px"}}>Select the best car that matches<br />
                        your criteria.
                           </p>
                    </div>
                    <div>
                        <img src={logo} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Book and Pay</h3>
                        <p style={{margin:"0 0 0 11px"}}>Pick your favourite car,time <br />
                           and place.
                        </p>
                    </div>
                    <div>
                    <img src={logo3} alt="" className="img" />
                        <h3 style={{margin:"-10px 0px 0px 11px"}}>Enjoy your ride</h3>
                        <p style={{margin:"0 0 0 11px"}}>Enjoy your ride to the fullest<br />
                           with vroom cars.
                        </p>
                    </div>
                    
                </div>
            </div>
            </div>
            </div>
        
        
    );
}

// Add prop types validation
Home.propTypes = {
    setResults: PropTypes.func.isRequired,// Ensure results is an array and required
  };
export default Home;
