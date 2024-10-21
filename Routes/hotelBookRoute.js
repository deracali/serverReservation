const express = require('express');
const { createBooking, getUserBookings, getAllBookings, getHotelBookingById  } = require('../controller/hotelController')


const hotelBookRouter = express.Router()

hotelBookRouter.post('',createBooking)
hotelBookRouter.get('',getUserBookings)
hotelBookRouter.get('',getAllBookings)
hotelBookRouter.post('',getHotelBookingById)



module.exports = {
    createBooking, getUserBookings, getAllBookings, getHotelBookingById
  };