const db = require("../models");
const Status = db.status;

// Create and Save a new Status
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a Status
  const status = new Status({
    name: req.body.name,
  });

  // Save Status in the database
  status
    .save(status)
    .then((data) => {
      res.send({ message: "Status was added successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Status.",
      });
    });
};

// Retrieve all Status from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  Status.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving statuses.",
      });
    });
};

// Find a single Status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Status.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Status with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Status with id=" + id });
    });
};

// Update a Status by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Status.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Status with id=${id}. Maybe Status was not found!`,
        });
      } else res.send({ message: "Status was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Status with id=" + id,
      });
    });
};

// Delete a Status with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Status.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Status with id=${id}. Maybe Status was not found!`,
        });
      } else {
        res.send({
          message: "Status was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Status with id=" + id,
      });
    });
};

// Delete all Status from the database.
exports.deleteAll = (req, res) => {
  Status.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Status were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all statuses.",
      });
    });
};
