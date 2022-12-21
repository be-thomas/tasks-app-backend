const ObjectId = require('mongoose').Types.ObjectId
const db = require("../../models")
const { is_string, is_boolean, is_array } = require("../../utils");
const Task = db.task;


function validateTaskUpdationInputs(res, data) {
    let updations = {};

    if(data.title) {
        if(!is_string(data.title)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Title and Description should be strings"})
            return null;
        }
        updations.title = data.title;
    }

    if(data.description) {
        if(!is_string(data.description)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Title and Description should be strings"})
            return null;
        }
        updations.description = data.description;
    }

    if(data.completed) {
        if(!is_boolean(completed)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Completed should be a boolean" })
            return null;
        }
        updations.completed = data.completed;
    }

    if(data.attachments) {
        if(!is_array(attachments)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Attachments should be an array" })
            return null;
        }
        updations.attachments = data.attachments;
    }
    return updations;
}


async function tasksUpdate(req, res) {
    const { task_id } = req.params;
    const updations = validateTaskUpdationInputs(res, req.body)
    if(updations === null) return
    if(!ObjectId.isValid(task_id)) {
        return res.status(500).send({ success: false, error: 'INVALID_DATA', message: 'Invalid task_id' })
    }

    try {
        let task = await Task.updateOne({ _id: task_id, user_id: req.user_id }, updations)

        if(task.modifiedCount === 0) {
            res.status(404).send({ success: false, error: "TASK_NOT_FOUND", message: "Task not found" })
        } else {
            res.send({ success: true, task_id })
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({ success: false, error: "DB_ERROR", message: "Error Updating Task Data" })
    }
}

module.exports = tasksUpdate
