var app = require("../app");

var _ = require("lodash");
var baucis = require("baucis");
var Swagger = require("baucis-swagger");

var swagger = new Swagger(baucis);

var mongoose = require("mongoose");

var FileModel = require("./../models/file");
var FolderModel = require("./../models/folder");

var express = require("express");
var router = express.Router();
router.get("/:slug/:name", function(req, res) {
  FolderModel.findOne({slug: req.params.slug}).populate("files").exec(function(err, folder) {
    var file = _.find(folder.files, function(file) {
      return file.name == req.params.name
    });
    res.type(file.type);
    res.send(file.content);
  });
});
app.use("/raw/", router);

var through = require("through");

baucis.rest(FolderModel);
//baucis.rest(FolderModel).request(function(req, res, next) {
//  req.baucis.outgoing(through(function(context) {
//    //context.doc._doc.id = context.doc._doc._id;
//    this.queue(context);
//  }));
//  next();
//});

baucis.rest(FileModel);
//baucis.rest(FileModel).request(function(req, res, next) {
//  req.baucis.outgoing(through(function(context) {
//    //context.doc._doc.id = context.doc._doc._id;
//    this.queue(context);
//  }));
//  next();
//});

//app.use("/api", function(req, res, next) {
//  console.log(req.body);
//  next();
//});

swagger.finalize(app);
app.use("/api", baucis());

mongoose.connect("mongodb://localhost/pastestore");

var genny = require("genny");
//genny.longStackSupport = true;

genny.run(function*(resume) {
  yield FileModel.remove(resume());
  yield FolderModel.remove(resume());

  //var folders = [];
  //_.times(2, function() {
  //  folders.push({});
  //});
  //yield FolderModel.create(folders, resume());
  //
  //genny.run(function*(resume) {
  //  FolderModel.findOne().exec(resume());
  //  FileModel.create({name: "foo.txt", content: "this is foo"}, resume());
  //  FileModel.create({name: "bar.txt", content: "this is bar"}, resume());
  //
  //  var folder = yield resume;
  //  var file1 = yield resume;
  //  var file2 = yield resume;
  //
  //  folder.files.push(file1);
  //  folder.files.push(file2);
  //  yield folder.save(resume());
  //});
});
