const db = require("../models");
const Storage = db.storage;

// Create and Save a new Storage
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.area_id) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a Storage
  const storage = new Storage({
    name: req.body.name,
    area: req.body.area_id,
  });

  // Save Storage in the database
  storage
    .save(storage)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Storage.",
      });
    });
};

// Retrieve all Storage from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  Storage.find(condition)
    .populate({
      path: "area",
      populate: {
        path: "warehouse",
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving storages.",
      });
    });
};

// Find a single Storage with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Storage.findById(id)
    .populate({
      path: "area",
      populate: {
        path: "warehouse",
      },
    })

    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Storage with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Storage with id=" + id });
    });
};

// Update a Storage by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Storage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Storage with id=${id}. Maybe Storage was not found!`,
        });
      } else res.send({ message: "Storage was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Storage with id=" + id,
      });
    });
};

// Delete a Storage with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Storage.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Storage with id=${id}. Maybe Storage was not found!`,
        });
      } else {
        res.send({
          message: "Storage was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Storage with id=" + id,
      });
    });
};

// Delete all Storage from the database.
exports.deleteAll = (req, res) => {
  Storage.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Storage were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all storages.",
      });
    });
};
