const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    company: req.body.supplier_id
  });

  user
    .save()
    .then((user) => {
      //if succeded do this block of code
      if (req.body.roles) {
        Role.find({
          name: { $in: req.body.roles },
        })
          .then((roles) => {
            user.roles = roles.map((role) => role._id);
            user
              .save()
              .then(() => {
                res.send({ message: "User was registered successfully!" });
              })
              .catch((err) => {
                res.status(500).send({ message: err });
                return;
              });
          })
          .catch((err) => {
            res.status(500).send({ message: err });
            return;
          });
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    })
    .catch((err) => {
      //catch error
      res.status(500).send({ message: err });
      return;
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .populate({
      path: "company"
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        roles: authorities,
        company: user.company
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

/* exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
}; */
