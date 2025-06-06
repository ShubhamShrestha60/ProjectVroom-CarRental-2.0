import React, { useState } from "react";
import "../styles/addCar.css";

const AddCar = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const availability =e.target.availability.checked;
    const isAvailable = availability ? true : false;
    // Create FormData object to append form data
    const formData = new FormData();
    formData.append('carID', e.target.carID.value);
    formData.append('brand', e.target.brand.value);
    formData.append('fuelType', e.target.fuelType.value);
    formData.append('transitionType', e.target.transitionType.value);
    formData.append('segment', e.target.segment.value);
    formData.append('price', e.target.price.value);
    formData.append('location', e.target.location.value);
    formData.append('availability', isAvailable);
    formData.append('condition', e.target.condition.value);
    formData.append('image', image); // Append image file
    
    try {
      const response = await fetch('http://localhost:3002/addCar', { 
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Car added successfully:', data.car);
      } else {
          console.error('Failed to add car:', response.statusText);
      }
  } catch (error) {
      console.error('Failed to add car:', error.message);
  }
};


  return (
    <div className="add-car">
      <h3 className="add-car__title">Add a New Car</h3>
      <form className="add-car__form" onSubmit={handleSubmit}>
        <div className="add-car__form-group">
          <label htmlFor="carID">Car ID:</label>
          <input type="number" id="carID" name="carID" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select id="fuelType" name="fuelType">
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="transitionType">Transition Type:</label>
          <select id="transitionType" name="transitionType">
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="segment">Segment:</label>
          <input type="text" id="segment" name="segment" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="availability">Availability:</label>
          <input type="checkbox" id="availability" name="availability" value="true"/>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="condition">Condition:</label>
          <input type="text" id="condition" name="condition" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="add-car__submit-btn">
          Add Car
        </button>
      </form>
    </div>
    
  );
};
 
export default AddCar;