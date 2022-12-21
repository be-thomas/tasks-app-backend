const db = require("../../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateNewUserInputs = require('./validateNewUserInputs')

const User = db.user;


function handleErrors(res, err, userObj, email, password) {
  if (err) {
      res.status(500).send({ error: "DB_ERROR", message: err });
      return false;
  }

  if (!userObj) {
      res.status(404).send({ error: "USER_NOT_FOUND", message: "User Not found." });
      return false;
  }

  let passwordIsValid = bcrypt.compareSync(password, userObj.password);
  if (!passwordIsValid) {
      res.status(401).send({ error: "INVALID_PASSWORD", message: "Invalid Password!" });
  }

  return true;
}


async function loginHandler(req, res) {
    const { email, password } = req.body;
    const config = req.config;

    if(!validateNewUserInputs(res, email, password)) return

    User.findOne({ email })
    .exec((err, user) => {
      if(!handleErrors(res, err, user, email, password)) return;
    
      var token = jwt.sign({ user_id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        user_id: user._id,
        email: user.email,
        accessToken: token
      });
    });
}


module.exports = loginHandler
