var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const expense = require("../controllers/expense.controller.js");

// Create a new Expense
router.post('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, expense.create);

//Retrieve all Expenses
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, expense.findAll)

// Retrieve Expenses By Year
router.get('/year/:id', withAuth.verifyToken, expense.findAllByYear)

// Retrieve Expenses By Year and Department
router.get('/year/:id/department/:id2', withAuth.verifyToken, withAuth.withRoleManager, expense.findAllByYearAndDept)

//Retrieve all Expenses by Department Id
router.get('/department/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, expense.findAllByDeptId);

//Retrieve a single Expense with an id
router.get('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, expense.findOne);

// Update an Expense with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, expense.update);

// Delete all Expenses
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, expense.deleteAll)

// Delete an Expense with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, expense.delete);

// Delete all Expenses by Department Id
router.delete('/department/:id', withAuth.verifyToken, withAuth.withRoleAdmin, expense.deleteAllByDeptId);

module.exports = router;
