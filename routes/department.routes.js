var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const department = require("../controllers/department.controller.js");

// Create a new Department
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, department.create);

//Retrieve all Departments
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, department.findAll);

//Retrieve a single Department with an id
router.get('/:id', withAuth.verifyToken, department.findOne);

// Update a Department with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, department.update);

// Delete a Department with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, department.delete);

// Delete all Departments
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, department.deleteAll);

module.exports = router;
