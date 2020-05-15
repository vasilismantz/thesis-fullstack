var express = require('express');
var router = express.Router();

const jobHistory = require("../controllers/jobHistory.controller.js");

// Create a new Department
router.post('/', jobHistory.create);

//Retrieve all Jobs
router.get('/', jobHistory.findAll);

//Retrieve all Jobs by Job Id
router.get('/job/:id', jobHistory.findAllByJobId);

//Retrieve all Jobs by User Id
router.get('/user/:id', jobHistory.findAllByUserId);

//Retrieve a single Department with an id
router.get('/:id', jobHistory.findOne);

// Update a Department with an id
router.put('/:id', jobHistory.update);

// Delete a Department with an id
router.delete('/:id', jobHistory.delete);

// Delete all Jobs
router.delete('/', jobHistory.deleteAll);

// Delete all Jobs
router.delete('/', jobHistory.deleteAll);

// Delete all Jobs by Organization Id
router.delete('/job/:id', jobHistory.deleteAllByJobId);

// Delete all Jobs by Department Id
router.delete('/user/:id', jobHistory.deleteAllByUserId);

module.exports = router;
