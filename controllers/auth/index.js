let express = require("express")

let authRouter = express.Router();

authRouter.post('/register', require('./register'))
authRouter.post('/login', require('./login'))



module.exports = authRouter;
