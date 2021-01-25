var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const daysHoliday = require("../controllers/daysHoliday.controller.js");

// Create a new Holiday Date
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, daysHoliday.create);

//Retrieve all Holiday Dates
router.get('/', withAuth.verifyToken, withAuth.withRoleAdmin, daysHoliday.findAll);

//Retrieve a single Holiday Date with an id
router.get('/:id', withAuth.verifyToken, daysHoliday.findOne);

// Delete a Holiday Date with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, daysHoliday.delete);

// Delete all Holiday Dates
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, daysHoliday.deleteAll);

module.exports = router;
