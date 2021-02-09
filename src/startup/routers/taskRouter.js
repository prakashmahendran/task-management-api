const express = require("express");
const auth = require("../../middleware/auth");
const taskRoute = require("../../routes/task");
const router = new express.Router();

router.post('/', auth, taskRoute.createTask);
router.get("/:id", auth, taskRoute.getTask);

module.exports = router;