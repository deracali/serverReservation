const express = require('express');
const { createBooking, getUserFlightBookings, getAllFlightBookings,getFlightBookingById  } = require('../controller/flightBookingController');


const flightbookRouter = express.Router()

flightbookRouter.post('',createBooking)
flightbookRouter.get('',getUserFlightBookings)
flightbookRouter.get('',getAllFlightBookings)
flightbookRouter.get('',getFlightBookingById)



module.exports = {
   createBooking, getUserFlightBookings, getAllFlightBookings,getFlightBookingById  
  };