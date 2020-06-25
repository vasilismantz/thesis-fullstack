var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const financialInformation = require("../controllers/userFinancialInformation.controller");

// Create a new User Financial Information
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, financialInformation.create);

// Retrieve all User Financial Information
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, financialInformation.findAll)

// Retrieve User Financial Information by User Id
router.get('/user/:id', withAuth.verifyToken, financialInformation.findByUserId);

// Retrieve a single User Financial Information with an id
router.get('/:id', withAuth.verifyToken, financialInformation.findOne);

// Update a User Financial Information with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, financialInformation.update);

module.exports = router;
