const db = require("../models");
const UserFinancialInformation = db.userFinancialInfo;
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

  // Create an UserFinancialInformation
  const userFinancialInformation = {
    employmentType: req.body.employmentType,
    salaryBasic: req.body.salaryBasic ,
    salaryGross: req.body.salaryGross,
    salaryNet: req.body.salaryNet,
    allowanceHouseRent: req.body.allowanceHouseRent,
    allowanceMedical: req.body.allowanceMedical,
    allowanceSpecial: req.body.allowanceSpecial,
    allowanceFuel: req.body.allowanceFuel,
    allowancePhoneBill: req.body.allowancePhoneBill,
    allowanceOther: req.body.allowanceOther,
    allowanceTotal: req.body.allowanceTotal,
    bankName: req.body.bankName,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    iban: req.body.iban,
    userId: req.body.userId
  };

  // Save UserFinancialInformation in the database
  UserFinancialInformation.findOne({
    where: {userId: userFinancialInformation.userId}
  }).
  then(user => {
    if(!user) {
      UserFinancialInformation.create(userFinancialInformation)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the UserFinancialInformation."
          });
        });
    } else {
      res.status(403).send({message: "Financial Information Already Exists for this User"})
    }
  })
};

// Retrieve all User Financial Informations from the database.
exports.findAll = (req, res) => {
  UserFinancialInformation.findAll({include: [{model: db.user, as: db.user.tablename}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User Financial Informations."
      });
    });
};

//Retrieve all User Financial Informations By User Id
exports.findByUserId = (req, res) => {
    const userId = req.params.id

    UserFinancialInformation.findAll({where: {userId: userId}})
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

// Find a single UserFinancialInformation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserFinancialInformation.findByPk(id, {include: [{model: db.user, as: db.user.tablename}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserFinancialInformation with id=" + id
      });
    });
};

// Update an UserFinancialInformation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserFinancialInformation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserFinancialInformation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserFinancialInformation with id=${id}. Maybe UserFinancialInformation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserFinancialInformation with id=" + id
      });
    });
};

// Delete an UserFinancialInformation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserFinancialInformation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserFinancialInformation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete UserFinancialInformation with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete UserFinancialInformation with id=" + id
      });
    });
};

// Delete all User Financial Informations from the database.
exports.deleteAll = (req, res) => {
  UserFinancialInformation.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} User Financial Informations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User Financial Informations."
      });
    });
};