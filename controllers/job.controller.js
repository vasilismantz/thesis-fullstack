const db = require("../models");
const Job = db.job;
const Op = db.Sequelize.Op;
const moment= require('moment')

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Job
  const newJob = {
    jobTitle: req.body.jobTitle,
    startDate: moment(req.body.startDate).format('YYYY-MM-DD HH:mm:ss'),
    endDate: moment(req.body.endDate).format('YYYY-MM-DD HH:mm:ss'),
    userId: req.body.userId,
  };

  Job.findOne({
    where: {
      [Op.and]: [
        { userId: req.body.userId },
        {startDate: {[Op.lte]: Date.now()}},
        {endDate: 
          {
            [Op.or]: [
              {[Op.gte]: Date.now()},
              {[Op.is]: null}
            ]
          }
        }
      ]
    }
  }).then((job) => {
    if (job) {

      if(new Date(job.dataValues.endDate) > new Date(newJob.startDate)) {
        job.dataValues.endDate = moment(newJob.startDate).subtract(1, "days");
      }

      Job.update(job.dataValues, {
        where: { id: job.dataValues.id },
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Job.",
        });
      });

    } else {
      console.log('job not found')
      
    }

    Job.create(newJob)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Job.",
        });
      });
  });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  Job.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving jobs.",
      });
    });
};

//Retrieve all Jobs By User Id
exports.findAllByUserId = (req, res) => {
  const userId = req.params.id;

  Job.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving jobs.",
      });
    });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Job.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id,
      });
    });
};

// Update an Job by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Job.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Job with id=" + id,
      });
    });
};

// Delete an Job with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Job.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id,
      });
    });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
  Job.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Jobs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Jobs.",
      });
    });
};

// Delete all Jobs by User Id.
exports.deleteAllByUserId = (req, res) => {
  const userId = req.params.id;

  Job.destroy({
    where: { userId: userId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Jobs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Jobs.",
      });
    });
};
