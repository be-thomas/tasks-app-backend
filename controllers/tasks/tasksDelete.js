const ObjectId = require('mongoose').Types.ObjectId
const db = require("../../models")
const Task = db.task;

async function tasksDelete(req, res) {
    const { task_id } = req.params

    if(!ObjectId.isValid(task_id)) {
        return res.status(500).send({ success: false, error: 'INVALID_DATA', message: 'Invalid task_id' })
    }

    try {
        await Task.deleteOne({ _id: task_id, user_id: req.user_id })
        res.send({ success: true, task_id })

    } catch(err) {
        console.log(err);
        res.status(500).send({ success: false, error: "DB_ERROR", message: "Error Deleting Task" })
    }
}

module.exports = tasksDelete
