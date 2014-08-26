var mongoose = require("mongoose");
var cuid = require("cuid");

var FolderSchema = new mongoose.Schema({
  slug:       {type: String, default: cuid.slug},
  files:      [{type: mongoose.Schema.Types.ObjectId, ref: "file"}],
  created_at: {type: Date},
  updated_at: {type: Date}
});

FolderSchema.pre("save", function(next) {
  var now = Date.now();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

FolderSchema.post("save", function(doc) {
  console.log("%s has been saved", doc.slug);
});

var FolderModel = mongoose.model("folder", FolderSchema);
module.exports = FolderModel;
