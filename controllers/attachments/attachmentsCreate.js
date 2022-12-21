

function attachmentsCreate(req, res) {
    console.log(req.files)

    /*
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
    */
}


module.exports = attachmentsCreate
