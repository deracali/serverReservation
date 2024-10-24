const express = require('express');
const {  createFlightBooking,
   getAllFlightBookings,
   // getFlightBookingById,
   // updateFlightBooking,
   deleteFlightBooking,  } = require('../controller/flightBookingController');


const flightbookRouter = express.Router()

flightbookRouter.post('',createFlightBooking)
// flightbookRouter.get('/:userId',getUserFlightBookings)
flightbookRouter.get('',getAllFlightBookings)
flightbookRouter.delete('/:id', deleteFlightBooking)



module.exports = {
   createFlightBooking,
   getAllFlightBookings,
   deleteFlightBooking, 
   // getFlightBookingById,
   // updateFlightBooking,
  };