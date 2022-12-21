const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, req.config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.user_id = decoded.user_id;
      next();
    });
}


module.exports = verifyToken
