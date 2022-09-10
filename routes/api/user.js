const express = require('express');
const userRoute = express.Router();
const { checkSession } = require("../../util/authorization");
const userController = require('../../controllers/user')


userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.get('/user-list',userController.userList);
userRoute.get('/get-profile',checkSession,userController.userData);

module.exports = userRoute;