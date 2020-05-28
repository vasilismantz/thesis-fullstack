const db = require("../models");
const Organization = db.organization;
const Op = db.Sequelize.Op;

// Create and Save a new Organization
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Organization
  const organization = {
    organizationName: req.body.organizationName,
    emailAddress: req.body.emailAddress,
    city: req.body.city,
    country: req.body.country,
  };

  // Save User in the database
  Organization.findOne({
    where: { organizationName: organization.organizationName },
  }).then((organizationExists) => {
    if (!organizationExists) {
      Organization.create(organization)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Organization.",
          });
        });
    } else {
      res.status(401).send({
        message: "Organization Name already exists",
      });
    }
  });
};

// Retrieve all Organizations from the database.
exports.findAll = (req, res) => {
  var authData = req.authData;
  Organization.findAll({
    include: [{ model: db.department, as: db.department.tablename }],
  })
    .then((data) => {
      res.json({ data: data, authData });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations.",
      });
    });
};

// Find a single Organization with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  var authData = req.authData

  Organization.findByPk(id)
    .then((data) => {
      res.status(200).send({data: data, authData: authData});
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving Organization with id=" + id,
      });
    });
};

// Update an Organization by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Organization.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Organization was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Organization with id=${id}. Maybe Organization was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Organization with id=" + id,
      });
    });
};

// Delete an Organization with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Organization.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Organization was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Organization with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Organization with id=" + id,
      });
    });
};

// Delete all Organizations from the database.
exports.deleteAll = (req, res) => {
  Organization.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Organizations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Organizations.",
      });
    });
};
