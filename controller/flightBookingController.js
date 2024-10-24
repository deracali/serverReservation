const FlightBooking = require('../model/FlightBookModel');

// Create a new flight booking
const createFlightBooking = async (req, res) => {
  try {
    const flightBooking = new FlightBooking(req.body); // Use the body of the request
    const savedBooking = await flightBooking.save();   // Save the booking to the database
    res.status(201).json(savedBooking);                // Send back the saved booking
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flight bookings
const getAllFlightBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.find().sort({ createdAt: -1 });;       // Fetch all bookings
    res.status(200).json(bookings);                    // Send back all bookings
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a flight booking by ID
const getFlightBookingById = async (req, res) => {
  try {
    const booking = await FlightBooking.findById(req.params.id);  // Fetch booking by ID
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a flight booking
const updateFlightBooking = async (req, res) => {
  try {
    const updatedBooking = await FlightBooking.findByIdAndUpdate(
      req.params.id,
      req.body,                                  // Update booking with request body
      { new: true }                              // Return the updated document
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a flight booking
const deleteFlightBooking = async (req, res) => {
  try {
    const deletedBooking = await FlightBooking.findByIdAndDelete(req.params.id); // Delete by ID
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all the controller functions
module.exports = {
  createFlightBooking,
  getAllFlightBookings,
  getFlightBookingById,
  updateFlightBooking,
  deleteFlightBooking,
};
