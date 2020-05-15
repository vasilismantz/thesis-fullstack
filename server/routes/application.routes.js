var express = require('express');
var router = express.Router();

const application = require("../controllers/application.controller.js");

// Create a new Application
router.post('/', application.create);

//Retrieve all Application
router.get('/', application.findAll);

//Retrieve all Application by Organization Id
router.get('/organization/:id', application.findAllByOrgId);

//Retrieve all Application by User Id
router.get('/user/:id', application.findAllByUserId);

//Retrieve a single Application with an id
router.get('/:id', application.findOne);

// Update a Application with an id
router.put('/:id', application.update);

// Delete a Application with an id
router.delete('/:id', application.delete);

// Delete all Application
router.delete('/', application.deleteAll);

// Delete all Application
router.delete('/', application.deleteAll);

// Delete all Application by Organization Id
router.delete('/organization/:id', application.deleteAllByOrgId);

// Delete all Application by User Id
router.delete('/user/:id', application.deleteAllByUserId);

module.exports = router;
