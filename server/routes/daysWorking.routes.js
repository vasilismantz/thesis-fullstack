var express = require('express');
var router = express.Router();

const daysWorking = require("../controllers/daysWorking.controller.js");

// Create a new Department
router.post('/', daysWorking.create);

//Retrieve all Working Days
router.get('/', daysWorking.findAll);

//Retrieve all Working Days by Organization Id
router.get('/organization/:id', daysWorking.findAllByOrgId);

//Retrieve a single Department with an id
router.get('/:id', daysWorking.findOne);

// Update a Department with an id
router.put('/:id', daysWorking.update);

// Delete a Department with an id
router.delete('/:id', daysWorking.delete);

// Delete all Working Days
router.delete('/', daysWorking.deleteAll);

// Delete all Working Days
router.delete('/', daysWorking.deleteAll);

// Delete all Working Days by Organization Id
router.delete('/organization/:id', daysWorking.deleteAllByOrgId);

module.exports = router;
