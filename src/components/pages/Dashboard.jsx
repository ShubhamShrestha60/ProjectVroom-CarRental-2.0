import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [totalCars, setTotalCars] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(10); // Number of cars to display per page

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/cars?page=${currentPage}&limit=${carsPerPage}`);
                setCars(response.data);
                setTotalCars(response.headers['x-total-count']);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, [currentPage, carsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalCars / carsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    return (
        <div className="dashboard">
            <div className="dashboard__wrapper">
                {/* Total Cars Card */}
                <div className="single__card total__card">
                    <div className="card__content">
                        <h4>Total Cars</h4>
                        <span>{totalCars}</span>
                    </div>
                </div>

                {/* List of Individual Car Cards */}
                <div className="dashboard__cards">
                    {currentCars.map((car) => (
                        <div key={car._id} className="single__card">
                            <div className="card__content">
                                <h4>{car.brand}</h4>
                                <span>Price: {car.price}</span>
                            </div>
                            {car.imageUrl && (
                                <div className="card__image">
                                    <img src={`http://localhost:3002/${car.imageUrl}`} alt={car.brand} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    {Array.from({ length: Math.ceil(totalCars / carsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(totalCars / carsPerPage)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;