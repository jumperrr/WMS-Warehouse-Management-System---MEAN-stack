const { authJwt } = require("../middlewares");
const unit = require("../controllers/unit.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new unit
    router.post("/", [authJwt.verifyToken], unit.create);
  
    // Retrieve all units
    router.get("/", [authJwt.verifyToken], unit.findAll);
  
    // Retrieve a single unit with id
    router.get("/:id", [authJwt.verifyToken], unit.findOne);
  
    // Update a unit with id
    router.put("/:id", [authJwt.verifyToken], unit.update);
  
    // Delete a unit with id
    router.delete("/:id", [authJwt.verifyToken], unit.delete);
  
    // Delete all units
    router.delete("/", [authJwt.verifyToken], unit.deleteAll);
  
    app.use("/api/unit", router);
  };