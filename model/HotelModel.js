const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_id: { type: Number },
    chain_id: { type: Number },
    chain_name: { type: String },
    brand_id: { type: Number },
    brand_name: { type: String },
    hotel_name: { type: String },
    hotel_formerly_name: { type: String },
    hotel_translated_name: { type: String },
    addressline1: { type: String },
    addressline2: { type: String },
    zipcode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    countryisocode: { type: String },
    star_rating: { type: Number },
    longitude: { type: Number },
    latitude: { type: Number },
    url: { type: String },
    checkin: { type: String },
    checkout: { type: String },
    numberrooms: { type: Number },
    numberfloors: { type: Number },
    yearopened: { type: Number },
    yearrenovated: { type: Number },
    photo1: { type: String },
    photo2: { type: String },
    photo3: { type: String },
    photo4: { type: String },
    photo5: { type: String },
    overview: { type: String },
    rates_from: { type: Number },
    continent_id: { type: Number },
    continent_name: { type: String },
    city_id: { type: Number },
    country_id: { type: Number },
    number_of_reviews: { type: Number },
    rating_average: { type: Number },
    rates_currency: { type: String }
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
