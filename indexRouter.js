let express = require("express")

let indexRouter = express.Router();

indexRouter.use("/auth", require("./controllers/auth"))
indexRouter.use("/tasks", require("./controllers/tasks"))




module.exports = indexRouter
