var express = require('express');
var router = express.Router();

const personalInformation = require("../controllers/userPersonalEvent.controller.js");

// Create a new User Personal Information
router.post('/', personalInformation.create);

//Retrieve all User Personal Informations 
router.get('/', personalInformation.findAll);

//Retrieve all User Personal Informations by User Id
router.get('/user/:id', personalInformation.findAllByUserId);

//Retrieve a single User Personal Information with an id
router.get('/:id', personalInformation.findOne);

// Update a User Personal Information with an id
router.put('/:id', personalInformation.update);

// Delete a User Personal Information with an id
router.delete('/:id', personalInformation.delete);

// Delete all User Personal Informations
router.delete('/', personalInformation.deleteAll);

// Delete all User Personal Informations
router.delete('/', personalInformation.deleteAll);

// Delete all User Personal Informations by User Id
router.delete('/user/:id', personalInformation.deleteAllByUserId);

module.exports = router;
