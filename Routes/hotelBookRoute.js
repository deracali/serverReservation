const express = require('express');
const {
    createHotelBooking,
    getUserBookings,
    getAllBookings,
    getHotelBookingById
} = require('../controller/hotelBookingController'); // Ensure this path is correct

const hotelBookRouter = express.Router();


// Endpoint to create a booking
hotelBookRouter.post('/', createHotelBooking);

// Endpoint to get all bookings
hotelBookRouter.get('/all', getAllBookings);


// Endpoint to get a booking by user ID
hotelBookRouter.get('/:userId', getHotelBookingById);


// Export the router
module.exports = {createHotelBooking,
  getUserBookings,
  getAllBookings,
  getHotelBookingById
}
