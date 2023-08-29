const { authJwt } = require("../middlewares");
const order = require("../controllers/order.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new order
    router.post("/", [authJwt.verifyToken], order.create);
  
    // Retrieve all orders
    router.get("/", [authJwt.verifyToken], order.findAll);
  
    // Retrieve a single order with id
    router.get("/:id", [authJwt.verifyToken], order.findOne);
  
    // Update a order with id
    router.put("/:id", [authJwt.verifyToken], order.update);
  
    // Delete a order with id
    router.delete("/:id", [authJwt.verifyToken], order.delete);
  
    // Delete all orders
    router.delete("/", [authJwt.verifyToken], order.deleteAll);
  
    app.use("/api/order", router);
  };