var express = require('express');
var router = express.Router();

const withAuth = require('../withAuth');

const organization = require("../controllers/organization.controller.js");

// Create a new Organization
router.post('/', organization.create, withAuth.verifyToken);

//Retrieve a single Organization with an id
router.get('/:id', withAuth.verifyToken, organization.findOne);

// Update an Organization with id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, withAuth.verifyToken, organization.update);

// Delete an Organization with id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, organization.delete);

// Delete all Organizations
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, organization.deleteAll);

module.exports = router;
