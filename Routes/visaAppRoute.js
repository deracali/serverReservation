const express = require('express');
const { createApplication, getApplications, getApplicationById } = require('../controller/visaAppController');


const visaAppRouter = express.Router()

visaAppRouter.post('',createApplication)
visaAppRouter.get('',getApplications)
visaAppRouter.get('',getApplicationById)



module.exports = {
    createApplication, getApplications, getApplicationById 
  };