const multer  = require('multer')
const express = require("express")
const verifyToken = require('../../middlewares/verifyToken')

const attachmentsRouter = express.Router();
const upload = multer({ dest: "uploads/" });

attachmentsRouter.use(verifyToken)
attachmentsRouter.post('/', upload.single('file'), require('./attachmentsCreate'))


module.exports = attachmentsRouter;
