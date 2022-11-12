const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password : {String},
  image: { type: String },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
