const db = require("../models");
const JobOld = db.jobOld;
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
  const jobOld = {
    jobTitle: req.body.jobTitle,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    departmentId: req.body.departmentId,
    userId: req.body.userId
  };

  // Save Job in the database
  JobOld.create(jobOld)
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
  JobOld.findAll()
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

//Retrieve all Jobs By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    JobOld.findAll({where: {userId: userId}})
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

  JobOld.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
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

// Delete all Jobs by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    Job.destroy({
      where: {userId: userId},
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