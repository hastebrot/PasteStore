var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
  name:       String,
  content:    String,
  type:       {type: String, default: "text/plain"},
  created_at: {type: Date},
  updated_at: {type: Date}
});

FileSchema.pre("save", function(next) {
  var now = Date.now();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

var FileModel = mongoose.model("file", FileSchema);
module.exports = FileModel;
