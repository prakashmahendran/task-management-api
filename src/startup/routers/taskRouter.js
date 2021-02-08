const express = require("express");
const auth = require("../../middleware/auth");
const taskRoute = require("../../routes/task");
const router = new express.Router();

router.post('/task', auth, taskRoute.createTask);

router.get("/tasks/:id", auth, taskRoute.getTask);

module.exports = router;