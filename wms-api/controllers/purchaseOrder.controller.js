const db = require("../models");
const PurchaseOrder = db.purchaseOrder;

// Create and Save a new PurchaseOrder
exports.create = (req, res) => {
  // Validate request
  if (!req.body.supplier_id || !req.body.products || !req.body.deliveryDate) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a PurchaseOrder
  const purchaseOrder = new PurchaseOrder({
    supplier: req.body.supplier_id,
    deliveryDate: new Date(req.body.deliveryDate),
    products: [],
    status: req.body.status_id,
  });
  req.body.products.forEach((element) => {
    purchaseOrder.products.push({
      product: element.product_id,
      quantity: element.quantity,
    });
  });

  // Save PurchaseOrder in the database
  purchaseOrder
    .save(purchaseOrder)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the PurchaseOrder.",
      });
    });
};

// Retrieve all PurchaseOrder from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  PurchaseOrder.find(condition)
    .populate({
      path: "supplier",
    })
    .populate({
      path: "products.product",
      populate: {
        path: "unit",
        select: "shortcut",
      },
    })
    .populate({
      path: "status",
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving purchaseOrders.",
      });
    });
};

// Find a single PurchaseOrder with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PurchaseOrder.findById(id)
    .populate({
      path: "supplier",
    })
    .populate({
      path: "products.product",
      populate: {
        path: "unit",
        select: "shortcut",
      },
    })
    .populate({
      path: "status",
    })

    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found PurchaseOrder with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error retrieving PurchaseOrder with id=" + id });
    });
};

// Update a PurchaseOrder by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  PurchaseOrder.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PurchaseOrder with id=${id}. Maybe PurchaseOrder was not found!`,
        });
      } else
        res.send({ message: "PurchaseOrder was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PurchaseOrder with id=" + id,
      });
    });
};

// Delete a PurchaseOrder with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PurchaseOrder.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete PurchaseOrder with id=${id}. Maybe PurchaseOrder was not found!`,
        });
      } else {
        res.send({
          message: "PurchaseOrder was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PurchaseOrder with id=" + id,
      });
    });
};

// Delete all PurchaseOrder from the database.
exports.deleteAll = (req, res) => {
  PurchaseOrder.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} PurchaseOrder were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all purchaseOrders.",
      });
    });
};
