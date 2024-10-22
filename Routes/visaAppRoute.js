const express = require('express');
const { createApplication, getApplications, getApplicationById } = require('../controller/visaAppController');


const visaAppRouter = express.Router()

visaAppRouter.post('/',createApplication)
visaAppRouter.get('/getall',getApplications)
visaAppRouter.get('/:id',getApplicationById)



module.exports = {
    createApplication, getApplications, getApplicationById 
  };