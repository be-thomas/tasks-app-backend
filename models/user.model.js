const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)
UserSchema.plugin(uniqueValidator)
const User = mongoose.model("User", UserSchema);



module.exports = User;
