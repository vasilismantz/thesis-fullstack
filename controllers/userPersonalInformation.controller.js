const db = require("../models");
const UserPersonalInformation = db.userPersonalInfo;
const Op = db.Sequelize.Op;
const moment = require('moment')

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an UserPersonalInformation
  const userPersonalInformation = {
    dateOfBirth: moment(req.body.dateOfBirth).format('YYYY-MM-DD'),
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    fatherName: req.body.fatherName,
    idNumber: req.body.idNumber,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    mobile: req.body.mobile,
    phone: req.body.phone,
    emailAddress: req.body.emailAddress,
    userId: req.body.userId
  };

  // Save UserPersonalInformation in the database
  UserPersonalInformation.findOne({
    where: {userId: userPersonalInformation.userId}
  })
  .then(user => {
    if(!user){
      UserPersonalInformation.create(userPersonalInformation)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the UserPersonalInformation."
          });
        });
    } else {
      res.status(403).send({message: "Personal Information already exists for this User"})
    }
  })
};

// Retrieve all User Personal Informations from the database.
exports.findAll = (req, res) => {
  UserPersonalInformation.findAll({include: [{model: db.user, as: db.user.tablename}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User Personal Informations."
      });
    });
};

//Retrieve all User Personal Informations By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    Payment.findAll({where: {userId: userId}})
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

// Find a single UserPersonalInformation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserPersonalInformation.findByPk(id, {include: [{model: db.user, as: db.user.tablename}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserPersonalInformation with id=" + id
      });
    });
};

// Update an UserPersonalInformation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserPersonalInformation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserPersonalInformation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserPersonalInformation with id=${id}. Maybe UserPersonalInformation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserPersonalInformation with id=" + id
      });
    });
};

// Delete an UserPersonalInformation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserPersonalInformation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserPersonalInformation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete UserPersonalInformation with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete UserPersonalInformation with id=" + id
      });
    });
};

// Delete all User Personal Informations from the database.
exports.deleteAll = (req, res) => {
  UserPersonalInformation.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} User Personal Informations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User Personal Informations."
      });
    });
};