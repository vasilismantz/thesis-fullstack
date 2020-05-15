var express = require('express');
var router = express.Router();

const department = require("../controllers/department.controller.js");

// Create a new Department
router.post('/', department.create);

//Retrieve all Departments
router.get('/', department.findAll);

//Retrieve all Departments by Organization Id
router.get('/organization/:id', department.findAllByOrgId);

//Retrieve a single Department with an id
router.get('/:id', department.findOne);

// Update a Department with an id
router.put('/:id', department.update);

// Delete a Department with an id
router.delete('/:id', department.delete);

// Delete all Departments
router.delete('/', department.deleteAll);

// Delete all Departments
router.delete('/', department.deleteAll);

// Delete all Departments by Organization Id
router.delete('/organization/:id', department.deleteAllByOrgId);

module.exports = router;
