const { authJwt } = require("../middlewares");
const warehouse = require("../controllers/warehouse.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new warehouse
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], warehouse.create);
  
    // Retrieve all warehouses
    router.get("/", [authJwt.verifyToken], warehouse.findAll);
  
    // Retrieve a single warehouse with id
    router.get("/:id", [authJwt.verifyToken], warehouse.findOne);
  
    // Update a warehouse with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], warehouse.update);
  
    // Delete a warehouse with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], warehouse.delete);
  
    // Delete all warehouses
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], warehouse.deleteAll);
  
    app.use("/api/warehouse", [authJwt.verifyToken], router);
  };