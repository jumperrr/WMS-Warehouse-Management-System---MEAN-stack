const { authJwt } = require("../middlewares");
const user = require("../controllers/user.controller");

module.exports = function (app) {
  var router = require("express").Router();

  // Retrieve all users
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], user.findAll);
  
  // Retrieve a single user with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], user.findOne);

  // Update a user with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], user.update);

  // Delete a user with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], user.delete);

  app.use("/api/user", router);
};
