var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const personalEvent = require("../controllers/userPersonalEvent.controller.js");

// Create a new Personal Event
router.post('/', withAuth.verifyToken, personalEvent.create);

//Retrieve all Personal Events  by User Id
router.get('/user/:id', withAuth.verifyToken, personalEvent.findAllByUserId);

//Retrieve a single Personal Event with an id
router.get('/:id', withAuth.verifyToken, personalEvent.findOne);

// Update a Personal Event with an id
router.put('/:id', withAuth.verifyToken, personalEvent.update);

// Delete a Personal Event with an id
router.delete('/:id', withAuth.verifyToken, personalEvent.delete);

// Delete all Personal Events by User Id
router.delete('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, personalEvent.deleteAllByUserId);

// Delete all Personal Events
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, personalEvent.deleteAll);

module.exports = router;
