const db = require("../models");
const Application = db.Application;
const Op = db.Sequelize.Op;

// Create and Save a new Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Application
  const application = {
    reason: req.body.reason,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status,
    organizationId: req.body.status,
    applicationTypeId: req.body.applicationTypeId
  };

  // Save Application in the database
  Application.create(application)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application."
      });
    });
};

// Retrieve all Applications from the database.
exports.findAll = (req, res) => {
  Application.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications."
      });
    });
};

//Retrieve all Applications By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    Application.findAll({where: {organizationId: organizationId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Applications."
        });
      });
  };

//Retrieve all Applications By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    Application.findAll({where: {userId: userId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Applications."
        });
      });
  };

// Find a single Application with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Application with id=" + id
      });
    });
};

// Update a Application by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Application.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Application was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Application with id=" + id
      });
    });
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Application.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Application was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Application with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Application with id=" + id
      });
    });
};

// Delete all Applications from the database.
exports.deleteAll = (req, res) => {
  Application.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Applications were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Applications."
      });
    });
};

// Delete all Applications by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    Application.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Applications were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Applications."
        });
      });
  };

// Delete all Applications by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    Application.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Applications were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Applications."
        });
      });
  };