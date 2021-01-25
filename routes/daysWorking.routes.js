var express = require('express');
var router = express.Router();

const withAuth = require('../withAuth')

const daysWorking = require("../controllers/daysWorking.controller.js");

// Create a new Working Day
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, daysWorking.create);

//Retrieve all Working Days
router.get('/', withAuth.verifyToken, daysWorking.findAll);

//Retrieve a single Working Day with an id
router.get('/:id', withAuth.verifyToken, daysWorking.findOne);

// Delete a Working Day with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, daysWorking.delete);

// Delete all Working Days
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, daysWorking.deleteAll);

module.exports = router;
