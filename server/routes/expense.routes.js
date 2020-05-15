var express = require('express');
var router = express.Router();

const expense = require("../controllers/expense.controller.js");

// Create a new Expense
router.post('/', expense.create);

//Retrieve all Expenses
router.get('/', expense.findAll);

//Retrieve all Expenses by Organization Id
router.get('/organization/:id', expense.findAllByOrgId);

//Retrieve all Expenses by User Id
router.get('/user/:id', expense.findAllByUserId);

//Retrieve a single Expense with an id
router.get('/:id', expense.findOne);

// Update a Expense with an id
router.put('/:id', expense.update);

// Delete a Expense with an id
router.delete('/:id', expense.delete);

// Delete all Expenses
router.delete('/', expense.deleteAll);

// Delete all Expenses
router.delete('/', expense.deleteAll);

// Delete all Expenses by Organization Id
router.delete('/organization/:id', expense.deleteAllByOrgId);

// Delete all Expenses by User Id
router.delete('/user/:id', expense.deleteAllByUserId);

module.exports = router;
