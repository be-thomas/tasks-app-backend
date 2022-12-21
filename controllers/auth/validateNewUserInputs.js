const is_string = require("../../utils").is_string;

function validateNewUserInputs(res, email, password) {
    if(!is_string(email) || !is_string(password)) {
      res.status(500).send({ success: false, error: "INVALID_DATA", message: "Invalid Email or Password" });
      return false;
    }
  
    if(email.length < 4 || password.length < 4) {
      res.status(500).send({ success: false, error: "INVALID_DATA", message: "Email or Password is shorter than 4 characters" });
      return false;
    }
  
    return true;
}




module.exports = validateNewUserInputs;
