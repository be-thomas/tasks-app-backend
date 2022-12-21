const db = require("../../models");

function attachmentsCreate(req, res) {
    let file = req.files[0]

    const {
        fieldname, originalname, encoding, mimetype,
        destination, filename, path, size
    } = file;

    const Attachment = db.attachment;

    const attachment = new Attachment({
        fieldname, originalname, encoding, mimetype,
        destination, filename, path, size
    })

    attachment.save()
    .then(attachment => {
        res.send({ success: true, attachment })
    }).catch(err => {
        console.log("err: ", err)
        res.status(500).send({ success: false, error: "SERVER_ERROR", message: "Error uploading file to server" })
    })
}


module.exports = attachmentsCreate
