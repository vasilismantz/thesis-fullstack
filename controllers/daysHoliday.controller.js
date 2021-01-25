const db = require("../models");
const DaysHoliday = db.daysHoliday;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Holiday Date
  const daysHoliday = {
    date: req.body.date,
    organizationId: req.body.organizationId
  };

  // Save Holiday Date in the database
  DaysHoliday.create(daysHoliday)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Holiday Date."
      });
    });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  DaysHoliday.findAll()
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

// Find a single Holiday Date with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DaysHoliday.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Holiday Date with id=" + id
      });
    });
};

// Update a Holiday Date by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DaysHoliday.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Holiday Date was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Holiday Date with id=${id}. Maybe Holiday Date was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Holiday Date with id=" + id
      });
    });
};

// Delete a Holiday Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DaysHoliday.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Holiday Date was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Holiday Date with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Holiday Date with id=" + id
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  DaysHoliday.destroy({
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