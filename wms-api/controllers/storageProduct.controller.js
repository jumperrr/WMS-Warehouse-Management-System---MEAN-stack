const db = require("../models");
const StorageProduct = db.storageProduct;

// Create and Save a new StorageProduct
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.quantity || !req.body.product_id || !req.body.storage_id) {
    res.status(400).send({ message: "Required data is missing!" });
    return;
  }

  // Create a StorageProduct
  const storageProduct = new StorageProduct({
    quantity: req.body.quantity,
    product: req.body.product_id,
    storage: req.body.storage_id,
  });

  // Save StorageProduct in the database
  storageProduct
    .save(storageProduct)
    .then((data) => {
      res.send({ message: "The product has been stored successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the StorageProduct.",
      });
    });
};

// Retrieve all StorageProduct from the database.
exports.findAll = (req, res) => {
  const condition = req.query;

  StorageProduct.find(condition)
    .populate({
      path: "product",
      populate: {
        path: "unit",
        select: "name shortcut",
      },
    })
    .populate({
      path: "storage",
      populate: {
        path: "area",
        select: "name",
        populate: {
          path: "warehouse",
        },
      },
    })
    .then((data) => {
      let totalQuantity = 0;

      if (condition.product && data.length != 0) {
        data.forEach((d) => {
          totalQuantity += d.quantity;
        })
      }
      res.send({data, totalQuantity});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving storageProducts.",
      });
    });
};

// Find a single StorageProduct with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StorageProduct.findById(id)
    .populate({
      path: "product",
      populate: {
        path: "unit",
        select: "name shortcut",
      },
    })
    .populate({
      path: "storage",
      populate: {
        path: "area",
        select: "name",
        populate: {
          path: "warehouse",
        },
      },
    })

    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found StorageProduct with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving StorageProduct with id=" + id });
    });
};

// Update a StorageProduct by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  StorageProduct.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update StorageProduct with id=${id}. Maybe StorageProduct was not found!`,
        });
      } else
        res.send({ message: "StorageProduct was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StorageProduct with id=" + id,
      });
    });
};

// Delete a StorageProduct with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StorageProduct.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete StorageProduct with id=${id}. Maybe StorageProduct was not found!`,
        });
      } else {
        res.send({
          message: "StorageProduct was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StorageProduct with id=" + id,
      });
    });
};

// Delete all StorageProduct from the database.
exports.deleteAll = (req, res) => {
  StorageProduct.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} StorageProduct were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all storageProducts.",
      });
    });
};
