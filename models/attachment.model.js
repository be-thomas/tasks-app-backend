const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const AttachmentSchema = new mongoose.Schema(
  {
    filepath: String
  },
  { timestamps: true }
)
const Attachment = mongoose.model("Attachment", AttachmentSchema);



module.exports = Attachment;
