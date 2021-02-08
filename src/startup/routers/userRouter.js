const express = require('express');
const userRoute = require("../../routes/user");
const router = new express.Router();

router.post('/signup', userRoute.createUser);

router.post("/login", userRoute.login);

module.exports = router;