const db = require("../models");
const Expense = db.expense;
const Op = db.Sequelize.Op;

// Create and Save a new Expense
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Expense
  const expense = {
    expenseItemName: req.body.expenseItemName,
    expenseItemStore: req.body.expenseItemStore,
    date: req.body.date,
    amount: req.body.amount,
    organizationId: req.body.organizationId,
    userId: req.body.userId
  };

  // Save Expense in the database
  Expense.create(expense)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense."
      });
    });
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
  Expense.findAll()
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

//Retrieve all Expenses By Organization Id
exports.findAllByOrgId = (req, res) => {
    const organizationId = req.params.id

    Expense.findAll({where: {organizationId: organizationId}})
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

//Retrieve all Expenses By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    Expense.findAll({where: {userId: userID}})
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

// Find a single Expense with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Expense with id=" + id
      });
    });
};

// Update an Expense by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Expense was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id
      });
    });
};

// Delete an Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id
      });
    });
};

// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {
  Expense.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Expenses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Expenses."
      });
    });
};

// Delete all Expenses by Organization Id.
exports.deleteAllByOrgId = (req, res) => {
    const organizationdId = req.params.id;

    Expense.destroy({
      where: {organizationId: organizationdId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Expenses were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Expenses."
        });
      });
  };

// Delete all Expenses by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    Expense.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Expenses were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Expenses."
        });
      });
  };