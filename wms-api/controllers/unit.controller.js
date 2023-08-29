const db = require("../models");
const Unit = db.unit;

// Create and Save a new Unit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.shortcut) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a Unit
  const unit = new Unit({
    name: req.body.name,
    shortcut: req.body.shortcut,
  });

  // Save Unit in the database
  unit
    .save(unit)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Unit.",
      });
    });
};

// Retrieve all Unit from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  Unit.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving units.",
      });
    });
};

// Find a single Unit with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Unit.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Unit with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Unit with id=" + id });
    });
};

// Update a Unit by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Unit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Unit with id=${id}. Maybe Unit was not found!`,
        });
      } else res.send({ message: "Unit was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Unit with id=" + id,
      });
    });
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Unit.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Unit with id=${id}. Maybe Unit was not found!`,
        });
      } else {
        res.send({
          message: "Unit was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Unit with id=" + id,
      });
    });
};

// Delete all Unit from the database.
exports.deleteAll = (req, res) => {
  Unit.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Unit were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all units.",
      });
    });
};
