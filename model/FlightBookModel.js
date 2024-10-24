const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  mobileNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Adjust the regex based on your mobile number format
  },
  tripType: {
    type: String,
    enum: ['oneWay', 'return', 'multiCity', 'roundTheWorld'],
    required: true,
  },
  origin: {
    type: String,
    required: function() {
      return this.tripType !== 'multiCity' && this.tripType !== 'roundTheWorld';
    },
  },
  destination: {
    type: String,
    required: function() {
      return this.tripType !== 'multiCity' && this.tripType !== 'roundTheWorld';
    },
  },
  departureDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: function() {
      return this.tripType === 'return';
    },
  },
  stops: {
    type: Number,
    min: 0,
    required: function() {
      return this.tripType === 'roundTheWorld';
    },
  },
  stopDetails: [
    {
      originStop: {
        type: String,
        required: function() {
          return this.tripType === 'roundTheWorld';
        },
      },
      destinationStop: {
        type: String,
        required: function() {
          return this.tripType === 'roundTheWorld';
        },
      },
    },
  ],
});

// Create a model from the schema
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
