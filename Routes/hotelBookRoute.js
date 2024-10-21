const express = require('express');
const {
    createHotelBooking,
    getUserBookings,
    getAllBookings,
    getHotelBookingById
} = require('../controller/hotelBookingController'); // Ensure this path is correct

const hotelBookRouter = express.Router();

// Define routes with unique paths
hotelBookRouter.post('', createHotelBooking); // Endpoint to create a booking
hotelBookRouter.get('/user/:userId', getUserBookings); // Endpoint to get user bookings
hotelBookRouter.get('/', getAllBookings); // Endpoint to get all bookings
hotelBookRouter.get('/:id', getHotelBookingById); // Endpoint to get a booking by ID

// Export the router
module.exports = {createHotelBooking,
  getUserBookings,
  getAllBookings,
  getHotelBookingById
}
