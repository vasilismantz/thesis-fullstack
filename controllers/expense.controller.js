const db = require("../models");
const Expense = db.expense;
const Department = db.department
const Op = db.Sequelize.Op;
const sequelize = db.sequelize

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
    departmentId: req.body.departmentId
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
  Expense.findAll({
    include: [{
      model: Department
    }]
  })
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

exports.findAllByYear = (req, res) => {
  const year = req.params.id;
  Expense.findAll({
    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
    attributes: [
      [sequelize.fn('monthname', sequelize.col('date')), 'month'], 
      [sequelize.fn('sum', sequelize.col('amount')), 'expenses']
    ],
    group: [sequelize.fn('month', sequelize.col('date')), 'month']

  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses."
      });
    });
};

exports.findAllByYearAndDept = (req, res) => {
  const year = req.params.id;
  const deptId = req.params.id2;
  Expense.findAll({
    where: {
      [Op.and]: [
        sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
        {departmentId: deptId}
      ]
    },
    attributes: [
      [sequelize.fn('monthname', sequelize.col('date')), 'month'], 
      [sequelize.fn('sum', sequelize.col('amount')), 'expenses']
    ],
    group: [sequelize.fn('month', sequelize.col('date')), 'month']

  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses."
      });
    });
};

//Retrieve all Expenses By Department Id
exports.findAllByDeptId = (req, res) => {
    const departmentId = req.params.id

    Expense.findAll({where: {departmentId: departmentId}})
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

// Delete all Expenses by Department Id.
exports.deleteAllByDeptId = (req, res) => {
    const departmentId = req.params.id;

    Expense.destroy({
      where: {departmentId: departmentId},
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