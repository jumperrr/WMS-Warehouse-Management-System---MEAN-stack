const { authJwt } = require("../middlewares");
const product = require("../controllers/product.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", [authJwt.verifyToken], product.create);
  
    // Retrieve all products
    router.get("/", [authJwt.verifyToken], product.findAll);
  
    // Retrieve a single product with id
    router.get("/:id", [authJwt.verifyToken], product.findOne);
  
    // Update a product with id
    router.put("/:id", [authJwt.verifyToken], product.update);
  
    // Delete a product with id
    router.delete("/:id", [authJwt.verifyToken], product.delete);
  
    // Delete all products
    router.delete("/", [authJwt.verifyToken], product.deleteAll);
  
    app.use("/api/product", router);
  };