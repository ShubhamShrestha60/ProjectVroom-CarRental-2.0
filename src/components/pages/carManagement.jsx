import React, { useState, useEffect } from 'react';
import '../styles/carManagement.css';

const CarManagement = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        carID: '',
        brand: '',
        fuelType: '',
        transitionType: '',
        segment: '',
        price: '',
        location: '',
        availability: false,
        condition: ''
    });
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3002/cars');
            if (response.ok) {
                const data = await response.json();
                setCars(data);
            } else {
                console.error('Failed to fetch cars');
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleUpdateCar = (car) => {
        setFormData(car);
        setShowEditPopup(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3002/updateCar/${formData.carID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedCars = cars.map((car) =>
                    car.carID === formData.carID ? { ...car, ...formData } : car
                );
                setCars(updatedCars);
                setShowEditPopup(false);
                console.log('Car updated successfully');
            } else {
                console.error('Failed to update car:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update car:', error.message);
        }
    };

    const handleDeleteCar = async (carID) => {
        try {
            const response = await fetch(`http://localhost:3002/deleteCar/${carID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const filteredCars = cars.filter((car) => car.carID !== carID);
                setCars(filteredCars);
                console.log('Car deleted successfully');
            } else {
                console.error('Failed to delete car:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete car:', error.message);
        }
    };

    return (
        <div className="Car-management">
            <h2>Car Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Car ID</th>
                        <th>Brand</th>
                        <th>Fuel Type</th>
                        <th>Transition Type</th>
                        <th>Segment</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Availability</th>
                        <th>Condition</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.carID}>
                            <td>{car.carID}</td>
                            <td>{car.brand}</td>
                            <td>{car.fuelType}</td>
                            <td>{car.transitionType}</td>
                            <td>{car.segment}</td>
                            <td>{car.price}</td>
                            <td>{car.location}</td>
                            <td>{car.availability ? 'Available' : 'Not Available'}</td>
                            <td>{car.condition}</td>
                            <td className="actions-container">
                                <button onClick={() => handleUpdateCar(car)}>Update</button>
                                <button onClick={() => handleDeleteCar(car.carID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Car Popup */}
            {showEditPopup && formData && (
                <div className="edit-popup">
                    <h3>Edit Car</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Car ID:</label>
                        <input type="text" value={formData.carID} readOnly />

                        <label>Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />

                        <label>Fuel Type:</label>
                        <input
                            type="text"
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleChange}
                        />

                        <label>Transition Type:</label>
                        <input
                            type="text"
                            name="transitionType"
                            value={formData.transitionType}
                            onChange={handleChange}
                        />

                        <label>Segment:</label>
                        <input
                            type="text"
                            name="segment"
                            value={formData.segment}
                            onChange={handleChange}
                        />

                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        <label>
                            Availability:
                            <input
                                type="checkbox"
                                name="availability"
                                checked={formData.availability}
                                onChange={handleChange}
                            />
                        </label>

                        <label>Condition:</label>
                        <input
                            type="text"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                        />

                        <div className="actions-container">
                            <button type="submit">Update Car</button>
                            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CarManagement;