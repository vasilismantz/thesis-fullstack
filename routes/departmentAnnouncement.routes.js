var express = require('express');
var router = express.Router();

const withAuth = require('../withAuth')

const departmentAnnouncement = require("../controllers/departmentAnnouncement.controller.js");

// Create a new Department Announcement
router.post('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, departmentAnnouncement.create);

//Retrieve all Announcement
router.get('/', withAuth.verifyToken, departmentAnnouncement.findAll)

router.get('/recent', withAuth.verifyToken, withAuth.withRoleAdmin, departmentAnnouncement.findAllRecent)

router.get('/recent/department/:id', withAuth.verifyToken, departmentAnnouncement.findAllRecentByDeptId)

//Retrieve all Announcements of a Department with DepartmentID
router.get('/department/:id', withAuth.verifyToken, departmentAnnouncement.findAllByDeptId);

//Retrieve a single Department Announcement with an id
router.get('/:id', withAuth.verifyToken, departmentAnnouncement.findOne);

// Delete a Department Announcement with an id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, departmentAnnouncement.delete);

// Delete all Department Announcements by Department Id
router.delete('/department/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, departmentAnnouncement.deleteAllByDeptId);

module.exports = router;
