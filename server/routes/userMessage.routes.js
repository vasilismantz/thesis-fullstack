var express = require('express');
var router = express.Router();

const message = require("../controllers/userMessage.controller.js");

// Create a new Message
router.post('/', message.create);

//Retrieve all Messages
router.get('/', message.findAll);

//Retrieve all Messages by User Id
router.get('/organization/:id', message.findAllByUserId);

//Retrieve a single Message with an id
router.get('/:id', message.findOne);

// Update a Message with an id
router.put('/:id', message.update);

// Delete a Message with an id
router.delete('/:id', message.delete);

// Delete all Messages
router.delete('/', message.deleteAll);

// Delete all Messages
router.delete('/', message.deleteAll);

// Delete all Messages by User Id
router.delete('/organization/:id', message.deleteAllByUserId);

module.exports = router;
