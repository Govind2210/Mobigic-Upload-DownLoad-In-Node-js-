const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  files: [{name: { type: String, required: true },
  code:{ type: String, required: true }}],
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const files = mongoose.model("files", fileSchema);

module.exports = files;