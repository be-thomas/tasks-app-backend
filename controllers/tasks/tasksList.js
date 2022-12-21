const { is_integer, is_string } = require('../../utils')
const db = require('../../models')

const Task = db.task;

function validateFields(res, fields, valid_fields) {
    if(fields === undefined) {
        return valid_fields;
    } else {
        if(!is_string(fields)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Invalid fields given" })
            return null;
        }
        fields = fields.split(",")
        if(fields !== valid_fields && fields.map(x => valid_fields.includes(x)).includes(false)) {
            res.status(500).send({ success: false, error: "INVALID_DATA", message: "Invalid fields given" })
            return null;
        }
    }
    return fields;
}

function validatePagination(res, skip, limit) {
    if(!is_integer(skip) || !is_integer(limit)) {
        res.status(500).send({ success: false, error: "INVALID_DATA", message: "skip and limit should be integers"}) 
        return false;
    }
    return true;
}

async function tasksList(req, res) {
    const valid_fields = ["title", "description", "completed", "attachments", "createdAt", "modifiedAt"]
    let { fields, skip, limit } = req.query;
    
    fields = validateFields(res, fields, valid_fields);
    if(fields === null) return

    if(skip === undefined) skip = 0;
    if(limit === undefined) limit = 10;
    if(!validatePagination(res, skip, limit)) return

    try {
        let tasks = await Task.find({ user_id: req.user_id }, fields, {skip, limit})
        res.send({ success: true, tasks })

    } catch(err) {
        console.log(err);
        return res.status(500).send({ success: false, error: "DB_ERROR", message: "Error Fetching Tasks" })
    }
}

module.exports = tasksList
