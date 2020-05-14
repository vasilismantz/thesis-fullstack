var express = require('express');
var router = express.Router();

const user = require("../controllers/user.controller.js");

// Create a new user
router.post('/', user.create);

//Retrieve all Users
router.get('/', user.findAll);

//Retrieve all Users by Organization
router.get('/organization/:id', user.findAllByOrganization)

//Retrieve a single User with an id
router.get('/:id', user.findOne);

// Update a User with id
router.put('/:id', user.update);

// Delete a User with id
router.delete('/:id', user.delete);

// Delete all Users
router.delete('/', user.deleteAll);

//Delete all Users by Organization
router.delete('/organization/:id', user.deleteAllByOrganization)

module.exports = router;
