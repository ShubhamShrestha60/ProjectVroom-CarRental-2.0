/*global require, module*/

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: String,
    carID: Number,
    bookingID: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    pickupLocation: String,
    dropoffLocation: String,
    pickupDate: String,
    pickupTime: String,
    dropoffDate: String,
    dropoffTime: String,
    LicenseNumber: String,
    ExpiryDate: String,
    LicensePhoto: String,
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    },
    returnArrangement: {
        returnDate: String,
        returnTime: String,
        arrangedBy: String,
        notes: String
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;