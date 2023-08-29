const db = require("../models");
const Warehouse = db.warehouse;

// Create and Save a new Warehouse
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Required data is missing!" });
      return;
    }
  
    // Create a Warehouse
    const warehouse = new Warehouse({
      name: req.body.name
    });
  
    // Save Warehouse in the database
    warehouse
      .save(warehouse)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Warehouse.",
        });
      });
  };
  
  // Retrieve all Warehouse from the database.
  exports.findAll = (req, res) => {
    const condition = req.query;
  
    Warehouse.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving warehouses.",
        });
      });
  };
  
  // Find a single Warehouse with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Warehouse.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Warehouse with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Warehouse with id=" + id });
      });
  };
  
  // Update a Warehouse by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Warehouse.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Warehouse with id=${id}. Maybe Warehouse was not found!`,
          });
        } else res.send({ message: "Warehouse was updated successfully.", data });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Warehouse with id=" + id,
        });
      });
  };
  
  // Delete a Warehouse with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Warehouse.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Warehouse with id=${id}. Maybe Warehouse was not found!`,
          });
        } else {
          res.send({
            message: "Warehouse was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Warehouse with id=" + id,
        });
      });
  };
  
  // Delete all Warehouse from the database.
  exports.deleteAll = (req, res) => {
    Warehouse.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Warehouse were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all warehouses.",
        });
      });
  };