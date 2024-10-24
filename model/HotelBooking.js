const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Multi-City schema for Multi-Stay trips
const MultiCitySchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
});

// Define the main booking schema
const BookingSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  mobileNumber: {
    type: String,
    trim: true,
    match: [/^\d{10,14}$/, 'Please enter a valid mobile number'], // Ensures the phone number has 10-14 digits
  },
  city: {
    type: String,
    required: function () {
      return this.tripType === 'singleStay'; // Required only if singleStay is selected
    },
  },
  checkInDate: {
    type: Date,
    required: function () {
      return this.tripType === 'singleStay'; // Required only if singleStay is selected
    },
  },
  checkOutDate: {
    type: Date,
    required: function () {
      return this.tripType === 'singleStay'; // Required only if singleStay is selected
    },
  },
  returnDate: {
    type: Date,
    required: function () {
      return this.tripType === 'roundTrip'; // Required only for roundTrip
    },
  },
  multiCityDetails: {
    type: [MultiCitySchema],
    required: function () {
      return this.tripType === 'multiStay'; // Required for multiStay trips
    },
  },
  tripType: {
    type: String,
    enum: ['singleStay', 'roundTrip', 'multiStay'], // Restricts to these three values
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
