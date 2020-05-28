var express = require('express');
var router = express.Router();

const withAuth = require("../withAuth")

const job = require("../controllers/job.controller.js");

// Create a new Job
router.post('/', withAuth.verifyToken, withAuth.withRoleAdmin, job.create);

//Retrieve all Jobs
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, job.findAll);

//Retrieve all Jobs by User Id
router.get('/user/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, job.findAllByUserId);

//Retrieve a single Job with an id
router.get('/:id', withAuth.verifyToken, job.findOne);

// Update a Job with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, job.update);

// Delete a Job with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdmin, job.delete);

// Delete all Jobs
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, job.deleteAll);

// Delete all Jobs by User Id
router.delete('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, job.deleteAllByUserId);

module.exports = router;
