const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
});

module.exports = model("User", User);
