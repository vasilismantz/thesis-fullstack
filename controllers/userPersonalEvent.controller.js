const db = require("../models");
const PersonalEvent = db.userPersonalEvent;
const Op = db.Sequelize.Op;

// Create and Save a new PersonalEvent
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PersonalEvent
  const personalEvent = {
    eventTitle: req.body.eventTitle,
    eventDescription: req.body.eventDescription,
    eventStartDate: req.body.eventStartDate,
    eventEndDate: req.body.eventEndDate,
    userId: req.body.userId
  };

  // Save PersonalEvent in the database
  PersonalEvent.create(personalEvent)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PersonalEvent."
      });
    });
};

// Retrieve all Personal Events from the database.
exports.findAll = (req, res) => {
  PersonalEvent.findAll()
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

//Retrieve all Personal Events By User Id
exports.findAllByUserId = (req, res) => {
    const userId = req.params.id

    PersonalEvent.findAll({where: {userId: userId}})
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

// Find a single PersonalEvent with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PersonalEvent.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PersonalEvent with id=" + id
      });
    });
};

// Update an PersonalEvent by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PersonalEvent.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PersonalEvent was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update PersonalEvent with id=${id}. Maybe PersonalEvent was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PersonalEvent with id=" + id
      });
    });
};

// Delete an PersonalEvent with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PersonalEvent.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PersonalEvent was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete PersonalEvent with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PersonalEvent with id=" + id
      });
    });
};

// Delete all Personal Events from the database.
exports.deleteAll = (req, res) => {
  PersonalEvent.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Personal Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Personal Events."
      });
    });
};

// Delete all Personal Events by User Id.
exports.deleteAllByUserId = (req, res) => {
    const userId = req.params.id;

    PersonalEvent.destroy({
      where: {userId: userId},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Personal Events were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Personal Events."
        });
      });
  };