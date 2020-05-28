const db = require("../models");
const DaysWorking = db.daysWorking;
const Op = db.Sequelize.Op;

// Create and Save a new Working Day
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Working Day
  const daysWorking = {
    day: req.body.day,
    startingHour: req.body.startingHour,
    endingHour: req.body.endingHour,
    organizationId: req.body.organizationId
  };

  // Save Working Day in the database
  DaysWorking.create(daysWorking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Working Day."
      });
    });
};

// Retrieve all Working Days from the database.
exports.findAll = (req, res) => {
  DaysWorking.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Working Days."
      });
    });
};

//Retrieve all Working Days By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    DaysWorking.findAll({where: {organizationId: organizationId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Working Days."
        });
      });
  };

// Find a single Working Day with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DaysWorking.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Working Day with id=" + id
      });
    });
};

// Update a Working Day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DaysWorking.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Working Day was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Working Day with id=${id}. Maybe Working Day was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Working Day with id=" + id
      });
    });
};

// Delete a Working Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DaysWorking.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Working Day was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Working Day with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Working Day with id=" + id
      });
    });
};

// Delete all Working Days from the database.
exports.deleteAll = (req, res) => {
  DaysWorking.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Working Days were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Working Days."
      });
    });
};

// Delete all Working Days by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    DaysWorking.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Working Days were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Working Days."
        });
      });
  };