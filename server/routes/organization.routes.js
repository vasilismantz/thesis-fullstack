var express = require('express');
var router = express.Router();

const organization = require("../controllers/organization.controller.js");

// Create a new Organization
router.post('/', organization.create);

//Retrieve all Organizations
router.get('/', organization.findAll);

//Retrieve a single Organization with an id
router.get('/:id', organization.findOne);

// Update an Organization with id
router.put('/:id', organization.update);

// Delete an Organization with id
router.delete('/:id', organization.delete);

// Delete all Organizations
router.delete('/', organization.deleteAll);

module.exports = router;
