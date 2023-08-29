const { authJwt } = require("../middlewares");
const purchaseOrder = require("../controllers/purchaseOrder.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new purchaseOrder
    router.post("/", [authJwt.verifyToken], purchaseOrder.create);
  
    // Retrieve all purchaseOrders
    router.get("/", [authJwt.verifyToken], purchaseOrder.findAll);
  
    // Retrieve a single purchaseOrder with id
    router.get("/:id", [authJwt.verifyToken], purchaseOrder.findOne);
  
    // Update a purchaseOrder with id
    router.put("/:id", [authJwt.verifyToken], purchaseOrder.update);
  
    // Delete a purchaseOrder with id
    router.delete("/:id", [authJwt.verifyToken], purchaseOrder.delete);
  
    // Delete all purchaseOrders
    router.delete("/", [authJwt.verifyToken], purchaseOrder.deleteAll);
  
    app.use("/api/purchaseorder", router);
  };