const { authJwt } = require("../middlewares");
const storageProduct = require("../controllers/storageProduct.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new storageProduct
    router.post("/", [authJwt.verifyToken], storageProduct.create);
  
    // Retrieve all storageProducts
    router.get("/", [authJwt.verifyToken], storageProduct.findAll);
  
    // Retrieve a single storageProduct with id
    router.get("/:id", [authJwt.verifyToken], storageProduct.findOne);
  
    // Update a storageProduct with id
    router.put("/:id", [authJwt.verifyToken], storageProduct.update);
  
    // Delete a storageProduct with id
    router.delete("/:id", [authJwt.verifyToken], storageProduct.delete);
  
    // Delete all storageProducts
    router.delete("/", [authJwt.verifyToken], storageProduct.deleteAll);
  
    app.use("/api/storageproduct", router);
  };