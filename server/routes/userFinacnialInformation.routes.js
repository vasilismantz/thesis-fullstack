var express = require('express');
var router = express.Router();

const financialInformation = require("../controllers/userFinancialEvent.controller.js");

// Create a new User Financial Information
router.post('/', financialInformation.create);

//Retrieve all User Financial Informations 
router.get('/', financialInformation.findAll);

//Retrieve all User Financial Informations by User Id
router.get('/user/:id', financialInformation.findAllByUserId);

//Retrieve a single User Financial Information with an id
router.get('/:id', financialInformation.findOne);

// Update a User Financial Information with an id
router.put('/:id', financialInformation.update);

// Delete a User Financial Information with an id
router.delete('/:id', financialInformation.delete);

// Delete all User Financial Informations
router.delete('/', financialInformation.deleteAll);

// Delete all User Financial Informations
router.delete('/', financialInformation.deleteAll);

// Delete all User Financial Informations by User Id
router.delete('/user/:id', financialInformation.deleteAllByUserId);

module.exports = router;
