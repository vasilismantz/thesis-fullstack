const db = require("../models");
const Payment = db.payment;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Payment
  const payment = {
    paymentType: req.body.paymentType,
    paymentMonth: req.body.paymentMonth,
    paymentFine: req.body.PaymentFine,
    paymentAmount: req.body.paymentAmount,
    comments: req.body.comments,
    organizationId: req.body.organizationId,
    userId: req.body.userId
  };

  // Save Payment in the database
  Payment.create(payment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  Payment.findAll()
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

//Retrieve all Payments By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    Payment.findAll({where: {organizationId: organizationId}})
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

//Retrieve all Payments By User Id
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

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Payment with id=" + id
      });
    });
};

// Update an Payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with id=" + id
      });
    });
};

// Delete an Payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Payments."
      });
    });
};

// Delete all Payments by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    Payment.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Payments were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Payments."
        });
      });
  };

// Delete all Payments by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    Payment.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Payments were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Payments."
        });
      });
  };