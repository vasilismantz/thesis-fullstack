var express = require('express');
var router = express.Router();

const withAuth = require('../withAuth')

const application = require("../controllers/application.controller.js");

// Retrieve all applications
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.findAll)

// Create a new Application
router.post('/', withAuth.verifyToken, application.create);

//Retrieve all Application by User Id
router.get('/user/:id', withAuth.verifyToken, application.findAllByUserId);

//Retrieve all Application by User Id
router.get('/department/:id', withAuth.verifyToken, withAuth.withRoleManager, application.findAllByDeptId);

//Retrieve Recent Applications (2 weeks old)
router.get('/recent', withAuth.verifyToken, application.findAllRecent)

//Retrieve Recent Applications (2 weeks old) And Dept
router.get('/recent/department/:id', withAuth.verifyToken, withAuth.withRoleManager, application.findAllRecentAndDept)

//Retrieve Recent Applications (2 weeks old) And User
router.get('/recent/user/:id', withAuth.verifyToken, application.findAllRecentAndUser)

//Retrieve a single Application with an id
router.get('/:id', withAuth.verifyToken, application.findOne);

// Update a Application with an id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.update);

// Delete all Applications
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, application.deleteAll);

router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.delete)

// Delete all Application by User Id
router.delete('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, application.deleteAllByUserId);

module.exports = router;
