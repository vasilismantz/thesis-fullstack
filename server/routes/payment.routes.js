var express = require('express');
var router = express.Router();

const payment = require("../controllers/payment.controller.js");

// Create a new Payment
router.post('/', payment.create);

//Retrieve all Payments 
router.get('/', payment.findAll);

//Retrieve all Payments  by Organization Id
router.get('/organization/:id', payment.findAllByOrgId);

//Retrieve all Payments  by User Id
router.get('/user/:id', payment.findAllByUserId);

//Retrieve a single Payment with an id
router.get('/:id', payment.findOne);

// Update a Payment with an id
router.put('/:id', payment.update);

// Delete a Payment with an id
router.delete('/:id', payment.delete);

// Delete all Payments
router.delete('/', payment.deleteAll);

// Delete all Payments
router.delete('/', payment.deleteAll);

// Delete all Payments by Organization Id
router.delete('/organization/:id', payment.deleteAllByOrgId);

// Delete all Payments by User Id
router.delete('/user/:id', payment.deleteAllByUserId);

module.exports = router;
