const db = require("../models");
const JobHistory = db.jobHistory;
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

  // Create a JobHistory
  const jobHistory = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
    jobId: req.body.jobId
  };

  // Save JobHistory in the database
  JobHistory.create(jobHistory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the JobHistory."
      });
    });
};

// Retrieve all Job Histories from the database.
exports.findAll = (req, res) => {
  JobHistory.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobHistorys."
      });
    });
};

//Retrieve all Job Histories By Job Id
exports.findAllByJobId = (req, res) => {
    const jobId = req.params.id

    JobHistory.findAll({where: {jobId: jobId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobHistorys."
        });
      });
  };

//Retrieve all Job Histories By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    JobHistory.findAll({where: {userId: userId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobHistorys."
        });
      });
  };

// Find a single JobHistory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  JobHistory.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving JobHistory with id=" + id
      });
    });
};

// Update an JobHistory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  JobHistory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "JobHistory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update JobHistory with id=${id}. Maybe JobHistory was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating JobHistory with id=" + id
      });
    });
};

// Delete an JobHistory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  JobHistory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "JobHistory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete JobHistory with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete JobHistory with id=" + id
      });
    });
};

// Delete all Job Histories from the database.
exports.deleteAll = (req, res) => {
  JobHistory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Job Histories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Job Histories."
      });
    });
};

// Delete all Job Histories by Job Id.
exports.deleteAllByJobId = (req, res) => {
    const jobId = req.params.id;

    JobHistory.destroy({
      where: {jobId: jobId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Job Histories were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Job Histories."
        });
      });
  };

// Delete all Job Histories by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    JobHistory.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Job Histories were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Job Histories."
        });
      });
  };