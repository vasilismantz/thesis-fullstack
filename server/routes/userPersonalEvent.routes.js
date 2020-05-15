var express = require('express');
var router = express.Router();

const personalEvent = require("../controllers/userPersonalEvent.controller.js");

// Create a new Personal Event
router.post('/', personalEvent.create);

//Retrieve all Personal Events 
router.get('/', personalEvent.findAll);

//Retrieve all Personal Events  by User Id
router.get('/user/:id', personalEvent.findAllByUserId);

//Retrieve a single Personal Event with an id
router.get('/:id', personalEvent.findOne);

// Update a Personal Event with an id
router.put('/:id', personalEvent.update);

// Delete a Personal Event with an id
router.delete('/:id', personalEvent.delete);

// Delete all Personal Events
router.delete('/', personalEvent.deleteAll);

// Delete all Personal Events
router.delete('/', personalEvent.deleteAll);

// Delete all Personal Events by User Id
router.delete('/user/:id', personalEvent.deleteAllByUserId);

module.exports = router;
