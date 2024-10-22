const express = require('express');
const { createBooking, getUserFlightBookings, getAllFlightBookings,getFlightBookingById  } = require('../controller/flightBookingController');


const flightbookRouter = express.Router()

flightbookRouter.post('',createBooking)
flightbookRouter.get('/:userId',getUserFlightBookings)
flightbookRouter.get('',getAllFlightBookings)
flightbookRouter.get('/:id',getFlightBookingById)



module.exports = {
   createBooking, getUserFlightBookings, getAllFlightBookings,getFlightBookingById  
  };