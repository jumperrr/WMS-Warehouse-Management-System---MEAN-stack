const db = require("../models");
const Order = db.order;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customer_id || !req.body.products || !req.body.deliveryDate) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a Order
  const order = new Order({
    customer: req.body.customer_id,
    deliveryDate: new Date(req.body.deliveryDate),
    products: [],
    status: req.body.status_id,
  });
  req.body.products.forEach((element) => {
    order.products.push({
      product: element.product_id,
      quantity: element.quantity,
    });
  });

  // Save Order in the database
  order
    .save(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Order from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  Order.find(condition)
    .populate({
      path: "customer",
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
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findById(id)
    .populate({
      path: "customer",
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
        res.status(404).send({ message: "Not found Order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Order with id=" + id });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      } else {
        res.send({
          message: "Order was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Order from the database.
exports.deleteAll = (req, res) => {
  Order.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Order were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};
