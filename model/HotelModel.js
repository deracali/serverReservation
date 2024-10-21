const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_id: { type: Number, required: true },
    chain_id: { type: Number, required: true },
    chain_name: { type: String, required: true },
    brand_id: { type: Number, required: true },
    brand_name: { type: String, required: true },
    hotel_name: { type: String, required: true },
    hotel_formerly_name: { type: String },
    hotel_translated_name: { type: String },
    addressline1: { type: String, required: true },
    addressline2: { type: String },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    countryisocode: { type: String, required: true },
    star_rating: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    url: { type: String, required: true },
    checkin: { type: String, required: true },
    checkout: { type: String, required: true },
    numberrooms: { type: Number, required: true },
    numberfloors: { type: Number },
    yearopened: { type: Number },
    yearrenovated: { type: Number },
    photo1: { type: String, required: true },
    photo2: { type: String },
    photo3: { type: String },
    photo4: { type: String },
    photo5: { type: String },
    overview: { type: String, required: true },
    rates_from: { type: Number, required: true },
    continent_id: { type: Number, required: true },
    continent_name: { type: String, required: true },
    city_id: { type: Number, required: true },
    country_id: { type: Number, required: true },
    number_of_reviews: { type: Number, required: true },
    rating_average: { type: Number, required: true },
    rates_currency: { type: String, required: true }
}, { timestamps: true }); // This will add createdAt and updatedAt timestamps

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
