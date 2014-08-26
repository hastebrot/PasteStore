var express = require("express");
var router = express.Router();

//var FileModel = require("../models/file");
//var FolderModel = require("../models/folder");

router.get("/", function(req, res) {
  //FolderModel.find().limit(10).populate("files").exec(function(err, docs) {
  //  res.json(docs);
  //});
});

module.exports = router;
