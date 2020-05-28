var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const message = require("../controllers/userMessage.controller.js");

// Create a new Message
router.post('/', withAuth.verifyToken, message.create);

//Retrieve all Messages by User Id
router.get('/user/:id', withAuth.verifyToken, message.findAllByUserId);

//Retrieve a single Message with an id
router.get('/:id', withAuth.verifyToken, message.findOne);

// Delete all Messages
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, message.deleteAll);

// Delete a Message with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, message.delete);

// Delete all Messages by User Id
router.delete('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, message.deleteAllByUserId);

module.exports = router;
