import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';

// Import images
import logo from "./card.png";
import logo1 from "./location.png";
import logo2 from "./car.png";
import logo3 from "./car.jpg";
import './home.css';

export const Home = ({setResults}) => {
    const cities = [
        'kathmandu', 'pokhara', 'dang', 'dharan', 'jhapa', 
        'mahendranagar', 'butwal', 'karnali', 'koshi', 
        'lalitpur', 'bharatpur', 'bhaktapur'
    ];

    const [pickupInput, setPickupInput] = useState("");
    const [pickupFilteredResults, setPickupFilteredResults] = useState([]);
    const [dropoffInput, setDropoffInput] = useState("");
    const [dropoffFilteredResults, setDropoffFilteredResults] = useState([]);
    const [pickupError, setPickupError] = useState("");
    const [dropoffError, setDropoffError] = useState("");
    const navigate = useNavigate();

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
        if (filteredResults.length === 0) {
            setterFunction("");
        }
    };

    const handleSuggestionClick = (value, setterFunction, setFilteredResultsFunction) => {
        setterFunction(value);
        setFilteredResultsFunction([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (pickupInput.trim() === "") {
            setPickupError("Please enter a pickup location");
            return;
        } else {
            setPickupError("");
        }

        if (dropoffInput.trim() === "") {
            setDropoffError("Please enter a drop-off location");
            return;
        } else {
            setDropoffError("");
        }

        // Make API call
        axios.post('http://localhost:3002/home', { location: pickupInput })
            .then(result => {
                if (result.data && result.data.length > 0) {
                    setResults(result.data);
                    localStorage.setItem("results", JSON.stringify(result.data));
                    localStorage.setItem("dropoffLocation", dropoffInput);
                    localStorage.setItem("pickupLocation", pickupInput);
                    navigate('/cars');
                } else if (result.data && result.data.message === "0 cars found") {
                    setResults([]);
                    localStorage.setItem("results", JSON.stringify([]));
                    navigate('/cars');
                } else {
                    console.error("Invalid response from server");
                }
            })
            .catch(err => console.error("Error fetching cars:", err));
    };

    return (
        <div className="main">
            <div className="search_main">
                <h1>Find Your Perfect Ride</h1>
                <p>Discover the best car rental deals across Nepal</p>
                
                <form className="search" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Enter pickup location"
                            className="input"
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
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Enter drop-off location"
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
                    </div>

                    <button type="submit" className="search_button">
                        Search Cars
                    </button>
                </form>
            </div>

            <div className="guide_main">
                <div className="decorative-top"></div>
                <div className="guide">
                    <h3>How It Works</h3>
                    <div className="content">
                        <div className="step" data-step="01">
                            <img src={logo1} alt="Location" className="img" />
                            <h3>Choose Location</h3>
                            <p>Select your pickup and drop-off locations from our wide network of cities</p>
                        </div>
                        <div className="step" data-step="02">
                            <img src={logo2} alt="Car Selection" className="img" />
                            <h3>Select Your Car</h3>
                            <p>Browse through our fleet and choose the perfect car for your journey</p>
                        </div>
                        <div className="step" data-step="03">
                            <img src={logo} alt="Payment" className="img" />
                            <h3>Book & Pay</h3>
                            <p>Secure your booking with our easy payment process</p>
                        </div>
                        <div className="step" data-step="04">
                            <img src={logo3} alt="Enjoy Ride" className="img" />
                            <h3>Enjoy Your Ride</h3>
                            <p>Hit the road with confidence in your Vroom rental car</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    setResults: PropTypes.func.isRequired,
};

export default Home;
