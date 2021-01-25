var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const personalInformation = require("../controllers/userPersonalInformation.controller.js");

// Create a new User Personal Information
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, personalInformation.create);

//Retrieve User Personal Informations by User Id
router.get('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, personalInformation.findAllByUserId);

//Retrieve a single User Personal Information with an id
router.get('/:id', withAuth.verifyToken, personalInformation.findOne);

// Update a User Personal Information with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, personalInformation.update);

// Delete a User Personal Information with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, personalInformation.delete);

// Delete all User Personal Informations
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, personalInformation.deleteAll);

module.exports = router;
