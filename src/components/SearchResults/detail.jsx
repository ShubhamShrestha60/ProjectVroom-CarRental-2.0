import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaGasPump, FaCar, FaCogs, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import './detail.css';

const Detail = () => {
    const { carID } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3002/carDetails', { carID: carID });
                setCarDetails(response.data);
                localStorage.setItem('carDetails', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [carID]);

    const handleBooking = () => {
        if (isLoggedIn) {
            navigate(`/booking`, { state: { carID: carDetails.carID } });
        } else {
            setShowLoginPopup(true);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (!carDetails) {
        return (
            <div className="detail-page">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading car details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <div className="detail-container">
                <div className="car-section">
                    <div className="car-header">
                        <h1>{carDetails.brand}</h1>
                        <div className="car-tags">
                            <span className="tag"><FaCar /> {carDetails.segment}</span>
                            <span className="tag"><FaGasPump /> {carDetails.fuelType}</span>
                            <span className="tag"><FaCogs /> {carDetails.transitionType}</span>
                        </div>
                    </div>

                    <div className="car-image">
                        <img 
                            src={`http://localhost:3002/${carDetails.imageUrl}`} 
                            alt={carDetails.brand} 
                        />
                    </div>

                    <div className="car-info-grid">
                        <div className="info-item">
                            <h4>Condition</h4>
                            <p><FaCheckCircle /> {carDetails.condition}</p>
                        </div>
                        <div className="info-item">
                            <h4>Segment</h4>
                            <p><FaCar /> {carDetails.segment}</p>
                        </div>
                        <div className="info-item">
                            <h4>Fuel Type</h4>
                            <p><FaGasPump /> {carDetails.fuelType}</p>
                        </div>
                        <div className="info-item">
                            <h4>Brand</h4>
                            <p><FaInfoCircle /> {carDetails.brand}</p>
                        </div>
                    </div>
                </div>

                <div className="pricing-section">
                    <div className="pricing-card">
                        <div className="price-display">
                            <h1>
                                <span className="currency">Rs</span>
                                {carDetails.price}
                                <span className="period">/day</span>
                            </h1>
                        </div>
                        <button className="rent-button" onClick={handleBooking}>
                            Rent Now
                        </button>
                        <div className="pricing-info">
                            <p>✓ Free cancellation up to 24h before pickup</p>
                            <p>✓ Zero security deposit</p>
                            <p>✓ 24/7 customer support</p>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginPopup && (
                <div className="login-popup">
                    <div className="popup-content">
                        <FaInfoCircle size={24} color="#666" />
                        <p className="popup-message">Please log in or sign up to continue with your booking.</p>
                        <div className="popup-buttons">
                            <button className="popup-button primary" onClick={handleLoginClick}>
                                Login/Signup
                            </button>
                            <button className="popup-button" onClick={() => setShowLoginPopup(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
