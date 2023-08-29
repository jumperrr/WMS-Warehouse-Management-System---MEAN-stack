const { authJwt } = require("../middlewares");
const area = require("../controllers/area.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new area
    router.post("/", [authJwt.verifyToken], area.create);
  
    // Retrieve all areas
    router.get("/", [authJwt.verifyToken], area.findAll);
  
    // Retrieve a single area with id
    router.get("/:id", [authJwt.verifyToken], area.findOne);
  
    // Update a area with id
    router.put("/:id", [authJwt.verifyToken], area.update);
  
    // Delete a area with id
    router.delete("/:id", [authJwt.verifyToken], area.delete);
  
    // Delete all areas
    router.delete("/", [authJwt.verifyToken], area.deleteAll);
  
    app.use("/api/area", router);
  };