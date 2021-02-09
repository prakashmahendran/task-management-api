const express = require('express');
const userRoute = require("../../routes/user");
const { validateSignup, validateLogin } = require("../../routes/user/validator");
const router = new express.Router();

router.post('/signup', validateSignup, userRoute.createUser);
router.post("/login", validateLogin, userRoute.login);

module.exports = router;