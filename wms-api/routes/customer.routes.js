const { authJwt } = require("../middlewares");
const customer = require("../controllers/customer.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new customer
    router.post("/", [authJwt.verifyToken], customer.create);
  
    // Retrieve all customers
    router.get("/", [authJwt.verifyToken], customer.findAll);
  
    // Retrieve a single customer with id
    router.get("/:id", [authJwt.verifyToken], customer.findOne);
  
    // Update a customer with id
    router.put("/:id", [authJwt.verifyToken], customer.update);
  
    // Delete a customer with id
    router.delete("/:id", [authJwt.verifyToken], customer.delete);
  
    // Delete all customers
    router.delete("/", [authJwt.verifyToken], customer.deleteAll);
  
    app.use("/api/customer", router);
  };