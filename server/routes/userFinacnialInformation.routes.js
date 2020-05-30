var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const financialInformation = require("../controllers/userFinancialEvent.controller.js");

// Create a new User Financial Information
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, financialInformation.create);

// Retrieve User Financial Information by User Id
router.get('/user/:id', withAuth.verifyToken, financialInformation.findAllByUserId);

// Retrieve a single User Financial Information with an id
router.get('/:id', withAuth.verifyToken, financialInformation.findOne);

// Update a User Financial Information with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, financialInformation.update);

module.exports = router;