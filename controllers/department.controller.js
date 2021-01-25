const db = require("../models");
const Department = db.department;
const User = db.user;
const Job = db.job;
const Op = db.Sequelize.Op;

// Create and Save a new Department
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Department
  const department = {
    departmentName: req.body.departmentName,
    organizationId: req.body.organizationId
  };

  // Save Department in the database
  Department.create(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  Department.findAll({
    include: [{
      model: User,
      include: {
        model: Job,
        include: {
          model: User
        }
      }
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving departments."
      });
    });
};

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findByPk(id, {
    include: [{
      model: User,
      include: {
        model: Job,
        include: {
          model: User
        }
      }
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Department with id=" + id
      });
    });
};

// Update a Department by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Department.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

// Delete an Department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findAll({
    where: {departmentId: id}
  })
  .then(users => {
    if(users) {
      users.map(user => {
        user.departmentId = null;
        user.save();
      })
    }
  })

  Department.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  Department.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments."
      });
    });
};