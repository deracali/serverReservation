const express = require('express');
const { getProfile, loginUser, registerUser, updateProfile, getUsers } = require('../controller/userController')


const userRouter = express.Router()

userRouter.post('',registerUser)
userRouter.post('',loginUser)
userRouter.post('',getUsers)

userRouter.get('',getProfile)
userRouter.post('/update-profile',updateProfile)

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    getUsers
  };