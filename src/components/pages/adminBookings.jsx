import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bookings.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    bookingID: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
  });

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/bookings`);
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error('Invalid bookings data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleOpenUpdateModal = (booking) => {
    setUpdateData({
      bookingID: booking._id,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      pickupDate: new Date(booking.pickupDate).toISOString().slice(0, 16),
      dropoffDate: new Date(booking.dropoffDate).toISOString().slice(0, 16),
    });
    setShowUpdateModal(true);
  };

  const handleUpdateBooking = async () => {
    try {
      const { bookingID, ...updatedFields } = updateData;
      await axios.put(`http://localhost:3002/bookings/${bookingID}`, updatedFields);
      fetchBookings();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleMarkAsCompleted = async (bookingID) => {
    try {
      await axios.put(`http://localhost:3002/bookings/${bookingID}/complete`);
      fetchBookings();
    } catch (error) {
      console.error('Error marking booking as completed:', error);
    }
  };


  const handleDeleteBooking = async (bookingID) => {
    try {
      await axios.delete(`http://localhost:3002/bookings/${bookingID}`);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="admin-bookings">
      <h2>Admin Bookings Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Pickup Date & Time</th>
            <th>Dropoff Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
       
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.email}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropoffLocation}</td>
              <td>{new Date(booking.pickupDate).toLocaleString()}</td>
              <td>{new Date(booking.dropoffDate).toLocaleString()}</td>
              <td>{booking.status}</td>
              <td className="actions-container">
                {booking.status === 'active' && (
                  <>
                    <button onClick={() => handleOpenUpdateModal(booking)}>Update</button>
                    <button onClick={() => handleMarkAsCompleted(booking._id)}>Mark as Complete</button>
                  </>
                )}
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>        
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Booking</h2>
            <label>
              Pickup Date & Time:
              <input
                type="datetime-local"
                value={updateData.pickupDate}
                onChange={(e) => setUpdateData({ ...updateData, pickupDate: e.target.value })}
              />
            </label>
            <label>
              Dropoff Date & Time:
              <input
                type="datetime-local"
                value={updateData.dropoffDate}
                onChange={(e) => setUpdateData({ ...updateData, dropoffDate: e.target.value })}
              />
            </label>
            <button onClick={handleUpdateBooking}>Save Changes</button>
            <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;