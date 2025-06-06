import React, { useState } from "react";
import "../styles/addCar.css";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const availability = e.target.availability.checked;
    const formData = new FormData();
    formData.append('carID', e.target.carID.value);
    formData.append('brand', e.target.brand.value);
    formData.append('fuelType', e.target.fuelType.value);
    formData.append('transitionType', e.target.transitionType.value);
    formData.append('segment', e.target.segment.value);
    formData.append('price', e.target.price.value);
    formData.append('location', e.target.location.value);
    formData.append('availability', availability);
    formData.append('condition', e.target.condition.value);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await fetch('http://localhost:3002/addCar', { 
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Car added successfully:', data.car);
        // Reset form
        e.target.reset();
        setImage(null);
        setImagePreview(null);
      } else {
        console.error('Failed to add car:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add car:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car">
      <h3 className="add-car__title">Add a New Car</h3>
      <form className="add-car__form" onSubmit={handleSubmit}>
        <div className="add-car__form-group">
          <label htmlFor="carID">Car ID</label>
          <input 
            type="number" 
            id="carID" 
            name="carID" 
            required 
            placeholder="Enter car ID"
          />
        </div>

        <div className="add-car__form-group">
          <label htmlFor="brand">Brand</label>
          <input 
            type="text" 
            id="brand" 
            name="brand" 
            required 
            placeholder="Enter car brand"
          />
        </div>

        <div className="add-car__form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select id="fuelType" name="fuelType" required>
            <option value="">Select fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="add-car__form-group">
          <label htmlFor="transitionType">Transmission Type</label>
          <select id="transitionType" name="transitionType" required>
            <option value="">Select transmission type</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <div className="add-car__form-group">
          <label htmlFor="segment">Segment</label>
          <select id="segment" name="segment" required>
            <option value="">Select segment</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="MPV">MPV</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div className="add-car__form-group">
          <label htmlFor="price">Price (per day)</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            required 
            min="0"
            placeholder="Enter price per day"
          />
        </div>

        <div className="add-car__form-group">
          <label htmlFor="location">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            required 
            placeholder="Enter car location"
          />
        </div>

        <div className="add-car__form-group">
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" required>
            <option value="">Select condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        <div className="add-car__form-group">
          <label htmlFor="availability">
            <input 
              type="checkbox" 
              id="availability" 
              name="availability"
            />
            Available for Rent
          </label>
        </div>

        <div className="add-car__form-group add-car__form-group--full">
          <label htmlFor="image">Car Image</label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange}
            required
          />
          <div className="image-preview">
            {imagePreview ? (
              <img src={imagePreview} alt="Car preview" />
            ) : (
              <span className="image-preview__placeholder">
                Upload an image to see preview
              </span>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="add-car__submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding Car...' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};
 
export default AddCar;