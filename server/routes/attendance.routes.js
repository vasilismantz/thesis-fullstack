var express = require('express');
var router = express.Router();

const attendance = require("../controllers/attendance.controller.js");

// Create a new Attendance
router.post('/', attendance.create);

//Retrieve all Attendance
router.get('/', attendance.findAll);

//Retrieve all Attendance by Organization Id
router.get('/organization/:id', attendance.findAllByOrgId);

//Retrieve all Attendance by User Id
router.get('/user/:id', attendance.findAllByUserId);

//Retrieve a single Attendance with an id
router.get('/:id', attendance.findOne);

// Update a Attendance with an id
router.put('/:id', attendance.update);

// Delete a Attendance with an id
router.delete('/:id', attendance.delete);

// Delete all Attendances
router.delete('/', attendance.deleteAll);

// Delete all Attendances
router.delete('/', attendance.deleteAll);

// Delete all Attendances by Organization Id
router.delete('/organization/:id', attendance.deleteAllByOrgId);

// Delete all Attendance by User Id
router.delete('/user/:id', attendance.deleteAllByUserId);

module.exports = router;
