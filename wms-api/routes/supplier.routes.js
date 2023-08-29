const { authJwt } = require("../middlewares");
const supplier = require("../controllers/supplier.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new supplier
    router.post("/", [authJwt.verifyToken], supplier.create);
  
    // Retrieve all suppliers
    router.get("/", [authJwt.verifyToken], supplier.findAll);
  
    // Retrieve a single supplier with id
    router.get("/:id", [authJwt.verifyToken], supplier.findOne);
  
    // Update a supplier with id
    router.put("/:id", [authJwt.verifyToken], supplier.update);
  
    // Delete a supplier with id
    router.delete("/:id", [authJwt.verifyToken], supplier.delete);
  
    // Delete all suppliers
    router.delete("/", [authJwt.verifyToken], supplier.deleteAll);
  
    app.use("/api/supplier", router);
  };