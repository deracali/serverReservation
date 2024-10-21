const Hotel = require('../model/HotelModel'); // Adjust the path according to your file structure

// Controller function to post hotel data
const postHotelData = async (req, res) => {
    try {
        // Start with an empty hotel data object
        const hotelData = {
            ...req.body, // Populate with data from the request body
        };

        // Format hotel data
        const formattedHotelData = {
            ...hotelData,
            photos: [
                hotelData.photo1,
                hotelData.photo2,
                hotelData.photo3,
                hotelData.photo4,
                hotelData.photo5,
            ].filter(photo => photo), // Filter out any undefined/null values
        };

        // Create a new hotel entry
        const hotel = new Hotel(formattedHotelData);

        // Save to MongoDB
        await hotel.save();
        
        res.status(201).json({ message: 'Hotel data saved successfully', hotel });
    } catch (error) {
        
        res.status(500).json({ message: 'Error saving hotel data', error });
    }
};



// Controller function to get 20 hotels
const getHotels = async (req, res) => {
    try {
        // Retrieve 20 hotels from the database
        const hotels = await Hotel.find().limit(30);

        res.status(200).json({ message: 'Hotels retrieved successfully', hotels });
    } catch (error) {
       
        res.status(500).json({ message: 'Error retrieving hotels', error });
    }
};



// Controller function to search for hotels by country or city
const searchHotels = async (req, res) => {
    try {
        // Get the search term from the request body
        const { searchTerm } = req.body; // Assume the search term is sent in the request body

        // Find hotels that match the search term in country or city (case-insensitive)
        const hotels = await Hotel.find({
            $or: [
                { country: { $regex: searchTerm, $options: 'i' } }, // Search in country
                { city: { $regex: searchTerm, $options: 'i' } } // Search in city
            ]
        });

        res.status(200).json({ message: 'Hotels retrieved successfully', hotels });
    } catch (error) {
      
        res.status(500).json({ message: 'Error retrieving hotels', error });
    }
};



module.exports = { postHotelData, getHotels, searchHotels };
