var express = require('express');
var router = express.Router();

const job = require("../controllers/job.controller.js");

// Create a new Department
router.post('/', job.create);

//Retrieve all Jobs
router.get('/', job.findAll);

//Retrieve all Jobs by Organization Id
router.get('/organization/:id', job.findAllByOrgId);

//Retrieve all Jobs by DepartmentId Id
router.get('/department/:id', job.findAllByDeptId);

//Retrieve a single Department with an id
router.get('/:id', job.findOne);

// Update a Department with an id
router.put('/:id', job.update);

// Delete a Department with an id
router.delete('/:id', job.delete);

// Delete all Jobs
router.delete('/', job.deleteAll);

// Delete all Jobs
router.delete('/', job.deleteAll);

// Delete all Jobs by Organization Id
router.delete('/organization/:id', job.deleteAllByOrgId);

// Delete all Jobs by Department Id
router.delete('/department/:id', job.deleteAllByDeptId);

module.exports = router;
