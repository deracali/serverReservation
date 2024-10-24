const express = require('express');
const {
  createBooking, getAllBookings, deleteBooking
} = require('../controller/hotelBookingController'); // Ensure this path is correct

const hotelBookRouter = express.Router();


// Endpoint to create a booking
hotelBookRouter.post('/', createBooking);

// Endpoint to get all bookings
hotelBookRouter.get('/all', getAllBookings);


// Endpoint to get a booking by user ID
hotelBookRouter.delete('/bookings/:id',deleteBooking);


// Export the router
module.exports = {createBooking, getAllBookings, deleteBooking 
}
