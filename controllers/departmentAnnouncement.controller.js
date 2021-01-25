const db = require("../models");
const DepartmentAnnouncement = db.deptAnnouncement;
const User = db.user
const Department = db.department
const Op = db.Sequelize.Op;

// Create and Save a new Department Announcement Announcement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Department Announcement
  const departmentAnnouncement = {
    announcementTitle: req.body.announcementTitle,
    announcementDescription: req.body.announcementDescription,
    createdByUserId: req.body.createdByUserId,
    departmentId: req.body.departmentId,
    createdAt: new Date()
  };

  // Save Department Announcement in the database
  DepartmentAnnouncement.create(departmentAnnouncement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department Announcement."
      });
    });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  DepartmentAnnouncement.findAll({
    include: [{
      model: User
    }, {
      model: Department
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department Announcements."
      });
    });
};

// Retrieve all Recent Department Announcements from the database.
exports.findAllRecent = (req, res) => {
  DepartmentAnnouncement.findAll({
    include: [{
      model: User
    }, {
      model: Department
    }],
    order: [["createdAt", "DESC"]],
    limit: 2
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department Announcements."
      });
    });
};

// Retrieve all Recent Department Announcements from the database.
exports.findAllRecentByDeptId = (req, res) => {
  let deptId = req.params.id
  DepartmentAnnouncement.findAll({
    include: [{
      model: User
    }, {
      model: Department,
      where: {id: deptId}
    }],
    order: [["createdAt", "DESC"]],
    limit: 2
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department Announcements."
      });
    });
};

//Retrieve all Departments By Department Id
exports.findAllByDeptId = (req, res) => {
    const departmentId = req.params.id

    DepartmentAnnouncement.findAll({
      include: [{
        model: User
      }, {
        model: Department
      }],
      where: {departmentId: departmentId}
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Department Announcements."
        });
      });
  };

// Find a single Department Announcement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DepartmentAnnouncement.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Department Announcement with id=" + id
      });
    });
};

// Update an Department Announcement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DepartmentAnnouncement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department Announcement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Department Announcement with id=${id}. Maybe Department Announcement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department Announcement with id=" + id
      });
    });
};

// Delete a Department Announcement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DepartmentAnnouncement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department Announcement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Department Announcement with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department Announcement with id=" + id
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  DepartmentAnnouncement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Department Announcements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Department Announcements."
      });
    });
};

// Delete all Departments by Department Id.
exports.deleteAllByDeptId = (req, res) => {
    const departmentId = req.params.id;

    DepartmentAnnouncement.destroy({
      where: {departmentId: departmentId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Department Announcements were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Department Announcements of Department with id " + departmentId
        });
      });
  };