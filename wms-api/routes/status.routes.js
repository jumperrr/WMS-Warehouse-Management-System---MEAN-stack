const { authJwt } = require("../middlewares");
const status = require("../controllers/status.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new status
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin],  status.create);
  
    // Retrieve all statuss
    router.get("/", [authJwt.verifyToken],  status.findAll);
  
    // Retrieve a single status with id
    router.get("/:id", [authJwt.verifyToken],  status.findOne);
  
    // Update a status with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin],  status.update);
  
    // Delete a status with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],  status.delete);
  
    // Delete all statuss
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin],  status.deleteAll);
  
    app.use("/api/status", [authJwt.verifyToken, authJwt.isAdmin],  router);
  };