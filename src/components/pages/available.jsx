import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/available.css";

const Available = () => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3002/cars?page=${page}&limit=10`);
                console.log('Raw API Response:', response.data); // Log the raw response for inspection
                
                // Filter cars where availability is true
                const availableCars = response.data.filter((car) => car.availability === true);
                console.log('Filtered Available Cars:', availableCars); // Log the filtered cars
                
                setCars(availableCars);
            } catch (error) {
                console.error('Error fetching available cars:', error);
            }
            setLoading(false);
        };
    
        fetchCars(); // Initial load when component mounts
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage); // Update page when user clicks on pagination control
    };

    return (
        <div className="available">
            <h2>Available Cars</h2>
            <div className="available__cards">
                {cars.map((car) => (
                    <div key={car.carID} className="alone__card">
                        <div className="card__cont">
                            <h4>{car.brand}</h4>
                            <span>Price: {car.price}</span>
                        </div>
                        {car.imageUrl && (
                            <div className="card__pic">
                                <img src={`http://localhost:3002/${car.imageUrl}`} alt={car.brand} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Available;