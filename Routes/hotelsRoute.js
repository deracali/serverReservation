const express = require('express');
const { postHotelData, getHotels, searchHotels  } = require('../controller/hotelController')


const hotelRouter = express.Router()

hotelRouter.post('',postHotelData)
hotelRouter.get('',getHotels)
hotelRouter.post('',searchHotels)



module.exports = {
    postHotelData, getHotels, searchHotels 
  };