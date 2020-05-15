const db = require("../models");
const Job = db.job;
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

  // Create a Job
  const job = {
    jobTitle: req.body.jobTitle,
    departmentId: req.body.departmentId,
    organizationId: req.body.organizationId
  };

  // Save Job in the database
  Job.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  Job.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs."
      });
    });
};

//Retrieve all Jobs By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    Job.findAll({where: {organizationId: organizationId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobs."
        });
      });
  };

//Retrieve all Jobs By Department Id
exports.findAllByDeptId = (req, res) => {
    const departmentId = req.params.id

    Job.findAll({where: {departmentId: departmentId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobs."
        });
      });
  };

// Find a single Job with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Job.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
      });
    });
};

// Update an Job by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Job.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
};

// Delete an Job with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Job.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
  Job.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Jobs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Jobs."
      });
    });
};

// Delete all Jobs by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    Job.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Jobs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Jobs."
        });
      });
  };

// Delete all Jobs by Department Id.
exports.deleteAllByDeptId = (req, res) => {
    const departmentId = req.params.id;

    Job.destroy({
      where: {departmentId: departmentId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Jobs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Jobs."
        });
      });
  };