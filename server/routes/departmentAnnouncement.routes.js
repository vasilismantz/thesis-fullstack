var express = require('express');
var router = express.Router();

const departmentAnnouncement = require("../controllers/departmentAnnouncement.controller.js");

// Create a new Department Announcement
router.post('/', departmentAnnouncement.create);

//Retrieve all Department Announcements
router.get('/', departmentAnnouncement.findAll);

//Retrieve all Annoucnements of a Department with DepartmentID
router.get('/department/:id', departmentAnnouncement.findAllByDeptId);

//Retrieve a single Department Announcement with an id
router.get('/:id', departmentAnnouncement.findOne);

// Update a Department Announcement with an id
router.put('/:id', departmentAnnouncement.update);

// Delete a Department Announcement with an id
router.delete('/:id', departmentAnnouncement.delete);

// Delete all Department Announcements
router.delete('/', departmentAnnouncement.deleteAll);

// Delete all Department Announcements
router.delete('/', departmentAnnouncement.deleteAll);

// Delete all Department Announcements by Department Id
router.delete('/department/:id', departmentAnnouncement.deleteAllByDeptId);

module.exports = router;
