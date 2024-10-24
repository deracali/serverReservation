const Booking = require('../model/HotelBooking'); // Adjust the path according to your file structure

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body); // Assuming request body contains booking data
    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: 'Booking created successfully',
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating booking',
      error: error.message,
    });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });; // Fetch all bookings from the database
    res.status(200).json({
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving bookings',
      error: error.message,
    });
  }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting booking',
      error: error.message,
    });
  }
};

// Export the controller functions
module.exports = { createBooking, getAllBookings, deleteBooking };
