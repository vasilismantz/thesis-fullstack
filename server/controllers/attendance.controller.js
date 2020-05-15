const db = require("../models");
const Attendance = db.Attendance;
const Op = db.Sequelize.Op;

// Create and Save a new Attendance
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Attendance
  const attendance = {
    attendance: req.body.attendance,
    date: req.body.date,
    reason: req.body.reason,
    organizationId: req.body.status,
    userId: req.body.userId
  };

  // Save Attendance in the database
  Attendance.create(attendance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Attendance."
      });
    });
};

// Retrieve all Attendances from the database.
exports.findAll = (req, res) => {
  Attendance.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Attendances."
      });
    });
};

//Retrieve all Attendances By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    Attendance.findAll({where: {organizationId: organizationId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Attendances."
        });
      });
  };

//Retrieve all Attendances By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    Attendance.findAll({where: {userId: userId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Attendances."
        });
      });
  };

// Find a single Attendance with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Attendance.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Attendance with id=" + id
      });
    });
};

// Update a Attendance by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Attendance.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Attendance was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Attendance with id=" + id
      });
    });
};

// Delete a Attendance with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Attendance.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Attendance was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Attendance with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Attendance with id=" + id
      });
    });
};

// Delete all Attendances from the database.
exports.deleteAll = (req, res) => {
  Attendance.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Attendances were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Attendances."
      });
    });
};

// Delete all Attendances by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    Attendance.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Attendances were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Attendances."
        });
      });
  };

// Delete all Attendances by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    Attendance.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Attendances were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Attendances."
        });
      });
  };