const db = require("../models");
const Application = db.application;
const User = db.user;
const Department = db.department
const Op = db.Sequelize.Op;
const moment = require('moment');
const { department } = require("../models");

// Create and Save a new Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Application
  const application = {
    reason: req.body.reason,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: "pending",
    type: req.body.type,
    userId: req.body.userId,
  };

  // Save Application in the database

  Application.create(application)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application.",
      });
    });
};

// Retrieve all Applications from the database.
exports.findAll = (req, res) => {
  Application.findAll({
    include: User
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications.",
      });
    });
};

// Retrieve all Applications from the database.
exports.findAllRecent = (req, res) => {
  Application.findAll({
    where: {
      [Op.and]: [
        {startDate: {
          [Op.gte]: moment().subtract(14, 'days').toDate()
        }},
        {startDate : {
          [Op.lte]: moment().add(7, 'days').toDate()
        }}
      ]
    },
    include: [{
      model: User
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications.",
      });
    });
};

// Retrieve all Applications from the database.
exports.findAllRecent = (req, res) => {
  Application.findAll({
    where: {
      [Op.and]: [
        {startDate: {
          [Op.gte]: moment().subtract(14, 'days').toDate()
        }},
        {startDate : {
          [Op.lte]: moment().add(7, 'days').toDate()
        }}
      ]
    },
    include: [{
      model: User
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications.",
      });
    });
};

exports.findAllRecentAndDept = (req, res) => {
  const id = req.params.id

  Application.findAll({
    where: {
      [Op.and]: [
        {startDate: {
          [Op.gte]: moment().subtract(14, 'days').toDate()
        }},
        {startDate : {
          [Op.lte]: moment().add(7, 'days').toDate()
        }}
      ]
    },
    include: [{
      model: User,
      where: {departmentId: id}
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications.",
      });
    });
};

exports.findAllRecentAndUser = (req, res) => {
  const id = req.params.id

  Application.findAll({
    where: {
      [Op.and]: [
        {startDate: {
          [Op.gte]: moment().subtract(14, 'days').toDate()
        }},
        {startDate : {
          [Op.lte]: moment().add(7, 'days').toDate()
        }}
      ]
    },
    include: [{
      model: User,
      where: {id: id}
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Applications.",
      });
    });
};

//Retrieve all Applications By User Id
exports.findAllByDeptId = (req, res) => {
  const deptId = req.params.id;

  Application.findAll({
    include: [{
      model: User,
      where: {departmentId: deptId}
    }]
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Applications.",
    });
  })
};

//Retrieve all Applications By User Id
exports.findAllByUserId = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId).then((user) => {
    Application.findAll({ 
      include: [{
        model: User
      }],
      where: { userId: userId } 
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Applications.",
        });
      });
  });
};

// Find a single Application with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Application with id=" + id,
      });
    });
};

// Update a Application by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Application.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Application was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Application with id=" + id,
      });
    });
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Application.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Application was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Application with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Application with id=" + id,
      });
    });
};

// Delete all Applications from the database.
exports.deleteAll = (req, res) => {
  Application.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Applications were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Applications.",
      });
    });
};

// Delete all Applications by User Id.
exports.deleteAllByUserId = (req, res) => {
  const userId = req.params.id;

  Application.destroy({
    where: { userId: userId },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Applications were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Applications.",
      });
    });
};
