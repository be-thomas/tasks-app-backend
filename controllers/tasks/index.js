const express = require("express")
const verifyToken = require('../../middlewares/verifyToken')

const tasksRouter = express.Router();

tasksRouter.use(verifyToken)
tasksRouter.post('/', require('./tasksCreate'))
tasksRouter.get('/', require('./tasksList'))
tasksRouter.get('/:task_id', require('./tasksGet'))
tasksRouter.put('/:task_id', require('./tasksUpdate'))
tasksRouter.delete('/:task_id', require('./tasksDelete'))


module.exports = tasksRouter;
