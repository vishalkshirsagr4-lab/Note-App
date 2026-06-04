const { userRegister , userLogin } = require('../controllers/authControl');
const express = require('express');

const route = express.Router();

route.post('/register',userRegister);
route.post('/login', userLogin);

module.exports=route;