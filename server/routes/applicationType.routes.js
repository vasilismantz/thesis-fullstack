var express = require('express');
var router = express.Router();

const applicationType = require("../controllers/applicationType.controller.js");

// Create a new Application Type
router.post('/', applicationType.create);

//Retrieve all Application Type
router.get('/', applicationType.findAll);

//Retrieve all Application Type by Organization Id
router.get('/organization/:id', applicationType.findAllByOrgId);

//Retrieve a single Application Type with an id
router.get('/:id', applicationType.findOne);

// Update a Application Type with an id
router.put('/:id', applicationType.update);

// Delete a Application Type with an id
router.delete('/:id', applicationType.delete);

// Delete all Application Type
router.delete('/', applicationType.deleteAll);

// Delete all Application Type
router.delete('/', applicationType.deleteAll);

// Delete all Application Type by Organization Id
router.delete('/organization/:id', applicationType.deleteAllByOrgId);

module.exports = router;
