import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaGasPump, FaCar, FaCogs } from "react-icons/fa";

const Listing = ({ results }) => {
  const carCount = results.length;

  return (
    <div className="listing-section">
      <p className="results-count">{carCount} Car{carCount !== 1 && 's'} found</p>

      {carCount > 0 ? (
        <div className="car-grid">
          {results.map((car) => (
            <div key={car.id} className="car-card">
              <img
                className="listing-car-image"
                src={`http://localhost:3002/${car.imageUrl}`}
                alt={car.brand}
              />
              <div className="car-details">
                <div className="car-info">
                  <h3>{car.brand}</h3>
                  <p className="car-specs">
                    <span><FaGasPump /> {car.fuelType}</span>
                    <span><FaCogs /> {car.transitionType}</span>
                    <span><FaCar /> {car.segment}</span>
                  </p>
                </div>
                <div className="car-price-section">
                  <p className="car-price">Rs{car.price}/day</p>
                  <Link to={`/detail/${car.carID}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          background: 'white',
          borderRadius: '12px',
          color: '#666'
        }}>
          No cars found matching your criteria
        </div>
      )}
    </div>
  );
};

Listing.propTypes = {
  results: PropTypes.array.isRequired,
};

export default Listing;
