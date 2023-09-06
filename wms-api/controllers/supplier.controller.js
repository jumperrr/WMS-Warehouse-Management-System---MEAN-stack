const db = require("../models");
const Supplier = db.supplier;

// Create and Save a new Supplier
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a Supplier
  const supplier = new Supplier({
    name: req.body.name,
    address: req.body.address,
    nip: req.body.nip,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    products: [],
  });
  if (req.body.products) {
    req.body.products.forEach((element) => {
      supplier.products.push({
        product: element.product,
      });
    });
  }

  // Save Supplier in the database
  supplier
    .save(supplier)
    .then((data) => {
      res.send({ message: "Supplier was added successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier.",
      });
    });
};

// Retrieve all Supplier from the database.
exports.findAll = (req, res) => {
  const condition = req.query;


  Supplier.find(condition)
    .populate({
      path: "products.product",
      populate: {
        path: "unit",
        select: "shortcut",
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving suppliers.",
      });
    });
};

// Find a single Supplier with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Supplier.findById(id)
    .populate({
      path: "products.product",
      populate: {
        path: "unit",
        select: "shortcut",
      },
    })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Supplier with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Supplier with id=" + id });
    });
};

// Update a Supplier by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Supplier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found!`,
        });
      } else res.send({ message: "Supplier was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Supplier with id=" + id,
      });
    });
};

// Delete a Supplier with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Supplier.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`,
        });
      } else {
        res.send({
          message: "Supplier was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Supplier with id=" + id,
      });
    });
};

// Delete all Supplier from the database.
exports.deleteAll = (req, res) => {
  Supplier.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Supplier were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all suppliers.",
      });
    });
};
