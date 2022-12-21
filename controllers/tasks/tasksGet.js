const ObjectId = require('mongoose').Types.ObjectId
const db = require("../../models")
const Task = db.task;
const Attachment = db.attachment;

async function tasksGet(req, res) {
    const { task_id } = req.params

    if(!ObjectId.isValid(task_id)) {
        return res.status(500).send({ success: false, error: 'INVALID_DATA', message: 'Invalid task_id' })
    }

    try {
        let task = await Task.findOne({ _id: task_id, user_id: req.user_id })
        if(task === null) {
            res.status(404).send({ success: false, error: "TASK_NOT_FOUND", message: "Task not found" })
        } else {
            let attachmentsData = await Attachment.find({
                _id: { '$in': task.attachments }
            }, { path: 1, originalname: 1, createdAt: 1 })
            res.send({ success: true,
                task: {
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    completed: task.completed,
                    attachments: attachmentsData,
                    createdAt: task.createdAt,
                    modifiedAt: task.modifiedAt
                }
            })
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({ success: false, error: "DB_ERROR", message: "Error Fetching Task Data" })
    }
}

module.exports = tasksGet
