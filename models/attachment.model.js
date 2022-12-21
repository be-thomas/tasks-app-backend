const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const AttachmentSchema = new mongoose.Schema(
  {
    user_id: { type: ObjectId, index: true },
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Schema.Types.Number
  },
  { timestamps: true }
)
const Attachment = mongoose.model("Attachment", AttachmentSchema);



module.exports = Attachment;
