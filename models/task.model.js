const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema(
  {
    user_id: { type: ObjectId, index: true },
    title: String,
    description: String,
    completed: Boolean,
    attachments: [String]
  },
  { timestamps: true }
)
const Task = mongoose.model("Task", TaskSchema);



module.exports = Task;
