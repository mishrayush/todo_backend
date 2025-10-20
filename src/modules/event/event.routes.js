const express = require("express");
const router = express.Router();
const EventController = require("./event.controller");

router.get("/list", EventController.list);

module.exports = router;