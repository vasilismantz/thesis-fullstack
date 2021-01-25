var express = require('express');
var router = express.Router();

const register = require("../../controllers/register/register.controller.js");

// Create a new user
router.post('/', register.create);

module.exports = router;