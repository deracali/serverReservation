const FlightBooking = require('../model/FlightBookModel'); // Ensure the correct path


const createBooking = async (req,res)=>{
    try {
        const bookingData = req.body;
  
    
  
        // Save the booking to the database (replace Booking with your actual model)
        const booking = await FlightBooking.create(bookingData);
  
        // Send confirmation email
        await sendBookingEmail(bookingData.userId, bookingData);
  
        // Respond with success
        res.status(200).json({ message: 'Flight booked successfully', bookingData });
    } catch (error) {
        
        res.status(500).json({ message: 'Error booking the flight' });
    }
}


// Controller function to get flight bookings for a specific user
const getUserFlightBookings = async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

  

    try {
        // Find flight bookings for the specified user and populate flight details
        const flightBookings = await FlightBooking.find({ userId }) // Optionally populate flight details

        // Respond with the retrieved flight bookings
        res.status(200).json(flightBookings);
    } catch (error) {
      
        res.status(500).json({ message: 'Error retrieving flight bookings', error });
    }
};

// Controller function to get all flight bookings
const getAllFlightBookings = async (req, res) => {
    try {
        const flightBookings = await FlightBooking.find() // Fetch all flight bookings and populate flight details

        // Respond with the retrieved flight bookings
        res.status(200).json(flightBookings);
    } catch (error) {
      
        res.status(500).json({ message: 'Error retrieving all flight bookings', error });
    }
};


// In your flight booking controller file
const getFlightBookingById = async (req, res) => {
    const { id } = req.params; // Get booking ID from request parameters

    try {
        const booking = await FlightBooking.findById(id) // Populate flight details if needed
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking); // Send the booking details as response
    } catch (error) {
      
        res.status(500).json({ message: 'Error retrieving booking', error });
    }
};

// Export the controller functions
module.exports = {createBooking, getUserFlightBookings, getAllFlightBookings,getFlightBookingById };
