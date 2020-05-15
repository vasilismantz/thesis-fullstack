var express = require('express');
var router = express.Router();

const daysHoliday = require("../controllers/daysHoliday.controller.js");

// Create a new Department
router.post('/', daysHoliday.create);

//Retrieve all Holiday Dates
router.get('/', daysHoliday.findAll);

//Retrieve all Holiday Dates by Organization Id
router.get('/organization/:id', daysHoliday.findAllByOrgId);

//Retrieve a single Department with an id
router.get('/:id', daysHoliday.findOne);

// Update a Department with an id
router.put('/:id', daysHoliday.update);

// Delete a Department with an id
router.delete('/:id', daysHoliday.delete);

// Delete all Holiday Dates
router.delete('/', daysHoliday.deleteAll);

// Delete all Holiday Dates
router.delete('/', daysHoliday.deleteAll);

// Delete all Holiday Dates by Organization Id
router.delete('/organization/:id', daysHoliday.deleteAllByOrgId);

module.exports = router;
