const db = require("../../models")
const { is_string, is_boolean, is_array } = require("../../utils");

const Task = db.task;


function validateNewTaskInputs(res, title, description, completed, attachments) {
    if(!is_string(title) && !is_string(description)) {
        res.status(500).send({ success: false, error: "INVALID_DATA", message: "Title and Description should be strings"})
        return false;
    }

    if(!is_boolean(completed)) {
        res.status(500).send({ success: false, error: "INVALID_DATA", message: "Completed should be a boolean" })
        return false;
    }

    if(!is_array(attachments)) {
        res.status(500).send({ success: false, error: "INVALID_DATA", message: "Attachments should be an array" })
    }
    return true;
}


async function tasksCreate(req, res) {
    const { title, description, completed, attachments } = req.body;

    if(!validateNewTaskInputs(res, title, description, completed, attachments)) return
    
    const task = new Task({
        user_id: req.user_id,
        title, description, completed, attachments
    })

    task.save((err, task) => {
        if(err) {
            return res.status(500).send({ success: false, error: "DB_ERROR", message: "Error creating Task!" })
        }

        return res.send({ success: true, task_id: task._id })
    })
}


module.exports = tasksCreate
