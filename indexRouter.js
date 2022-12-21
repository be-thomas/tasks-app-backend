let express = require("express")

let indexRouter = express.Router();

indexRouter.use("/auth", require("./controllers/auth"))
indexRouter.use("/tasks", require("./controllers/tasks"))
indexRouter.use("/attachments", require("./controllers/attachments"))



module.exports = indexRouter
