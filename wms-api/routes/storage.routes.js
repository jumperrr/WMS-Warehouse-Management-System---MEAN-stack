const { authJwt } = require("../middlewares");
const storage = require("../controllers/storage.controller");

module.exports = function (app) {
    var router = require("express").Router();
  
    // Create a new storage
    router.post("/", [authJwt.verifyToken], storage.create);
  
    // Retrieve all storages
    router.get("/", [authJwt.verifyToken], storage.findAll);
  
    // Retrieve a single storage with id
    router.get("/:id", [authJwt.verifyToken], storage.findOne);
  
    // Update a storage with id
    router.put("/:id", [authJwt.verifyToken], storage.update);
  
    // Delete a storage with id
    router.delete("/:id", [authJwt.verifyToken], storage.delete);
  
    // Delete all storages
    router.delete("/", [authJwt.verifyToken], storage.deleteAll);
  
    app.use("/api/storage", router);
  };