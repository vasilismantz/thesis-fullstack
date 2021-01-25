var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const payment = require("../controllers/payment.controller.js");

// Create a new Payment
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, payment.create);

// Retrieve all Payments
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, payment.findAll)

// Retrieve Expenses By Year
router.get('/year/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, payment.findAllByYear)

//Retrieve all Payments by Job Id
router.get('/job/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, payment.findAllByJobId);

router.get('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, payment.findAllByUser);

//Retrieve a single Payment with an id
router.get('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, payment.findOne);

// Update a Payment with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, payment.update);

// Delete a Payment with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, payment.delete);

// Delete all Payments
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, payment.deleteAll);

// Delete all Payments by Job Id
router.delete('/job/:id', withAuth.verifyToken, withAuth.withRoleAdmin, payment.deleteAllByOrgId);

module.exports = router;
