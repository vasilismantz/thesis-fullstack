const db = require("../models");
const ApplicationType = db.ApplicationType;
const Op = db.Sequelize.Op;

// Create and Save a new ApplicationType
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ApplicationType
  const applicationType = {
    applicationType: req.body.applicationType,
    organizationId: req.body.organizationId
  };

  // Save ApplicationType in the database
  ApplicationType.create(applicationType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ApplicationType."
      });
    });
};

// Retrieve all Application Types from the database.
exports.findAll = (req, res) => {
  ApplicationType.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Application Types."
      });
    });
};

//Retrieve all Application Types By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    ApplicationType.findAll({where: {organizationId: organizationId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Application Types."
        });
      });
  };

// Find a single ApplicationType with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ApplicationType.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ApplicationType with id=" + id
      });
    });
};

// Update a ApplicationType by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ApplicationType.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ApplicationType was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ApplicationType with id=${id}. Maybe ApplicationType was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ApplicationType with id=" + id
      });
    });
};

// Delete a ApplicationType with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ApplicationType.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ApplicationType was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ApplicationType with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ApplicationType with id=" + id
      });
    });
};

// Delete all Application Types from the database.
exports.deleteAll = (req, res) => {
  ApplicationType.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Application Types were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Application Types."
      });
    });
};

// Delete all Application Types by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    ApplicationType.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Application Types were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Application Types."
        });
      });
  };