const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel model
        required: true
    },
    userId: {
        type: String, // You can change this to a more complex user reference if needed
        required: true
    },
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
