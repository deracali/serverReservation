const express = require('express');
const cors = require('cors');
const Amadeus = require('amadeus');
const Flutterwave = require('flutterwave-node');
require('dotenv').config();
const crypto = require('crypto');
const connectDB = require('./config/mongodb.js');
const userRouter = require('./Routes/userRoute.js');
const hotelRouter = require('./Routes/hotelsRoute.js')
const hotelBookRouter = require('./Routes/hotelBookRoute.js')
const visaAppRouter = require('./Routes/visaAppRoute.js')
const flightRouter = require('./Routes/flightBooking.js')
const app = express()
const port = 4000
connectDB()


app.use(express.json())
app.use(cors())

app.use('/api/user/register',userRouter.registerUser)
app.use('/api/user/login',userRouter.loginUser)
app.use('/api/user/users',userRouter.getUsers)
app.use('/api/user/:userId',userRouter.getProfile)




app.use('/api/hotel/post',hotelRouter.postHotelData)
app.use('/api/hotel/get',hotelRouter.getHotels)
app.use('/api/hotel/search',hotelRouter.searchHotels)




app.use('/api/hotelbook/post',hotelBookRouter.createBooking)
app.use('/api/hotelbook/bookingId',hotelBookRouter.getHotelBookingById)
app.use('/api/hotelbook/userBooking',hotelBookRouter.getUserBookings)
app.use('/api/hotelbook/allbookings',hotelBookRouter.getAllBookings)






app.use('/api/visaApp/post',visaAppRouter.createApplication)
app.use('/api/visaApp/:id',visaAppRouter.getApplicationById)
app.use('/api/visaApp/getall',visaAppRouter.getApplications)






app.use('/api/flightbook/post',flighRouter.createBooking)
app.use('/api/flightbook/userbooking/:userid',flightRouter.getUserFlightBookings)
app.use('/api/flightbook/getall',flightRouter.getAllFlightBookings)
app.use('/api/flightbook/getbooking/:id',flightRouter.getFlightBookingById)


















let amadeusAccessToken = '';

// Function to get the Amadeus API access token
const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      'grant_type=client_credentials&client_id=mFwuroDvkIV5HkpGQqGECAfxMn1mu6Vc&client_secret=VP1N0bxg8NDFBj3e',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    amadeusAccessToken = response.data.access_token;
   
    return response.data.access_token; 
  } catch (error) {
    
    throw new Error('Unable to retrieve access token');
  }
};

// Middleware to ensure we have a valid token before making API calls
const ensureAmadeusToken = async (req, res, next) => {
  if (!amadeusAccessToken) {
    await getAmadeusAccessToken();
  }
  next();
};

// Function to get location name
const getLocationName = async (iataCode) => {
  try {
 
    const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations`, {
      params: {
        subType: 'AIRPORT,CITY',
        keyword: iataCode,
      },
      headers: {
        Authorization: `Bearer ${amadeusAccessToken}`,
      },
    });

    if (response.data.data && response.data.data.length > 0) {
      const locationName = response.data.data[0].name;
     
      return locationName;
    }
    return iataCode; // Fallback to the IATA code if no name is found
  } catch (error) {
 
    return iataCode; // Fallback to IATA code in case of error
  }
};

// Function to get IATA code from a location name (city or airport)
const getIataCode = async (location) => {
  try {
    const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
      params: {
        keyword: location,
        subType: 'CITY,AIRPORT',
      },
      headers: {
        Authorization: `Bearer ${amadeusAccessToken}`,
      },
    });

    const locationData = response.data.data[0];
    if (locationData && locationData.iataCode) {
      return locationData.iataCode;
    } else {
      throw new Error(`No IATA code found for location: ${location}`);
    }
  } catch (error) {
 
    throw new Error(`Unable to find IATA code for location: ${location}`);
  }
};

// Flight search endpoint
app.post('/api/flights', ensureAmadeusToken, async (req, res) => {
  const { origin, destination, departureDate } = req.body;

  try {
    // Convert origin and destination to IATA codes and get names
    const originIataCode = await getIataCode(origin);
    const destinationIataCode = await getIataCode(destination);

    // Get location names for origin and destination
    const originLocationName = await getLocationName(originIataCode);
    const destinationLocationName = await getLocationName(destinationIataCode);

    // Perform flight search with IATA codes
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      params: {
        originLocationCode: originIataCode,
        destinationLocationCode: destinationIataCode,
        departureDate,
        adults: 1,
      },
      headers: {
        Authorization: `Bearer ${amadeusAccessToken}`,
      },
    });

    // Attach location names to the flight data
    const flightData = response.data.data.map(flight => ({
      ...flight,
      originLocationName,          // Add origin name to flight data
      destinationLocationName,     // Add destination name to flight data
    }));

    res.json(flightData);  // Return flight data with location names
  } catch (error) {
  

    // Retry with a new token if token expired
    if (error.response && error.response.status === 401) {
      await getAmadeusAccessToken();
      return res.status(401).json({ error: 'Access token expired. Try again.' });
    }

    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});






































const FLWPUBK = process.env.FLWPUBK; // Load from .env
const FLWSECK = process.env.FLWSECK; // Load from .env
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Load from .env

// 3DES encryption function (Flutterwave expects ECB mode without IV)
const encryptPayload = (payload, encryptionKey) => {
  const key = Buffer.from(encryptionKey, 'utf8');
  const cipher = crypto.createCipheriv('des-ede3', key, null); // ECB mode without IV
  let encrypted = cipher.update(payload, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

// Card Payment Example
app.post('/api/charge-card', async (req, res) => {
  const { amount, email, fullname, card_number, cvv, expiry_month, expiry_year } = req.body;
  
  const selectedPrice = 3;
  
  const amountToCharge = selectedPrice; 
  try {
      // Build the card details
      const details = {
          "card_number": card_number,
          "cvv": cvv,
          "expiry_month": expiry_month,
          "expiry_year": expiry_year,
          "currency": "USD",           // Use your preferred currency
          "amount": selectedPrice,            // Transaction amount
          "fullname": fullname,        // Full name of the user
          "email": email,              // Email of the user
          "tx_ref": `MC-${new Date().getTime()}`, // Unique transaction reference
          "redirect_url": "https://www.flutterwave.ng", // Redirection URL after payment
      };

      // Encrypt the payload using 3DES encryption
      const encryptedPayload = encryptPayload(JSON.stringify(details), ENCRYPTION_KEY);

      // Make a request to Flutterwave's charge API with encrypted payload
      const response = await axios.post('https://api.flutterwave.com/v3/charges?type=card', {
          client: encryptedPayload // Encrypted payload
      }, {
          headers: {
              Authorization: `Bearer ${FLWSECK}`, // Use your secret key here
              'Content-Type': 'application/json',
          },
      });

      // On success, Flutterwave responds with transaction data
      res.status(200).json({
          status: 'success',
          message: 'Payment request created successfully',
          data: response.data,
      });
  } catch (error) {
      // Log and return the error details
      res.status(500).json({
          status: 'error',
          message: error.response ? error.response.data.message : 'An unexpected error occurred',
      });
  }
});

// Bank Transfer Payment Example
app.post('/api/banktransfer', async (req, res) => {
  const { amount, email, phone_number } = req.body;

  try {
      const response = await axios.post('https://api.flutterwave.com/v3/payments', {
          tx_ref: `tx_${new Date().getTime()}`, // Unique transaction reference
          amount,
          currency: 'NGN', // Change to your preferred currency
          email,
          phone_number,  // Required for bank transfer
          payment_type: 'banktransfer', // For bank transfers
          redirect_url: 'http://localhost:3000/api/callback', // Your redirect URL
      }, {
          headers: {
              Authorization: `Bearer ${FLWSECK}`, // Use the secret key here
              'Content-Type': 'application/json',
          },
      });

      res.status(200).json({
          status: 'success',
          message: 'Bank transfer initiated',
          data: response.data,
      });
  } catch (error) {
      res.status(500).json({
          status: 'error',
          message: error.response ? error.response.data.message : 'An unexpected error occurred',
      });
  }
});



// Callback endpoint
app.get('/api/callback', (req, res) => {
    // Handle callback from Flutterwave here
    res.send('Payment was successful or failed');
});


app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=>console.log("Server Started", port))