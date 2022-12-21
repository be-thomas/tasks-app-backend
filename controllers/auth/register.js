const bcrypt = require('bcryptjs')
const User = require('../../models/user.model')
const validateNewUserInputs = require('./validateNewUserInputs')


async function registerHandler(req, res) {
    const { email, password } = req.body;

    if(!validateNewUserInputs(res, email, password)) return

    const user = new User({
      email, password: bcrypt.hashSync(req.body.password, 8)
    });
    
    user.save((err, user) => {
      if(err) {
        return res.status(500).send({ success: false, error: "USER_ALREADY_EXISTS", message: "User already exists!"});
      }
      
      res.send({ success: true, message: "User was registered successfully!" });
    });
}





module.exports = registerHandler
