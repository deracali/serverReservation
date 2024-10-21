const Booking = require('../model/HotelBooking'); // Adjust the path according to your file structure
const Hotel = require('../model/HotelModel'); // To find hotel details

// Controller function to create a new booking
const createBooking = async (req, res) => {
    const { hotelId, userId, checkinDate, checkoutDate } = req.body;

    try {
        // Find the hotel by ID
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Create a new booking
        const booking = new Booking({
            hotel: hotelId,
            userId,
            checkinDate,
            checkoutDate,
        });

        // Save the booking to MongoDB
        await booking.save();
        
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
       
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Controller function to get bookings for a specific user
const getUserBookings = async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    try {
        // Find bookings for the specified user and populate hotel details
        const bookings = await Booking.find({ userId }) // Ensure you're using the correct field for user ID
            .populate('hotel'); // Adjust if necessary to match your schema

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};


// Controller function to get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('hotel'); // Fetch all bookings and populate hotel details
        res.status(200).json(bookings);
    } catch (error) {
        
        res.status(500).json({ message: 'Error retrieving all bookings', error });
    }
};


// Controller function to get hotel booking by ID
const getHotelBookingById = async (req, res) => {
    const { id } = req.params; // Get booking ID from the request parameters
  
    try {
      // Find the hotel booking by its ID and populate the hotel details
      const booking = await Booking.findById(id) // Assuming "hotel" is a reference field
  
      if (!booking) {
        return res.status(404).json({ message: 'Hotel booking not found' });
      }
  
      // Respond with the booking details
      res.status(200).json(booking);
    } catch (error) {
    
      res.status(500).json({ message: 'Error retrieving hotel booking', error });
    }
  };
  

// Export the controller functions
module.exports = { createBooking, getUserBookings, getAllBookings, getHotelBookingById };
