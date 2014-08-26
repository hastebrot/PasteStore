//-------------------------------------------------------------------------------------------------
// PasteStoreApp.
//-------------------------------------------------------------------------------------------------

var app = angular.module("PasteStoreApp", ["ngRoute", "restmod", "PasteStoreControllers"]);

app.config(function($routeProvider, restmodProvider) {
  $routeProvider
    .when("/browse", {
      templateUrl: "partials/folder-list.html",
      controller: "FolderListCtrl"
    })
    .when("/browse/create", {
      templateUrl: "partials/folder-create.html",
      controller: "FolderCreateCtrl"
    })
    .when("/browse/:folderSlug", {
      templateUrl: "partials/folder-show.html",
      controller: "FolderShowCtrl"
    })
    .when("/browse/:folderSlug/edit", {
      templateUrl: "partials/folder-edit.html",
      controller: "FolderEditCtrl"
    })
    .otherwise({
      redirectTo: "/browse"
    });

  restmodProvider.pushModelBase(function() {
    this.setPrimaryKey("_id");
  });
});

app.factory("FileModel", function(restmod) {
  return restmod.model("/api/files", {});
});

app.factory("FolderModel", function(restmod) {
  return restmod.model("/api/folders", {
    files: {belongsToMany: "FileModel", keys: "files"}
  })
});

//-------------------------------------------------------------------------------------------------
// PasteStoreControllers.
//-------------------------------------------------------------------------------------------------

var controllers = angular.module("PasteStoreControllers", ["angularMoment"]);

controllers.controller("FolderListCtrl", function($scope, FolderModel, FileModel) {
  $(window).trigger("resize");

  $scope.onRefresh = function() {
    // FolderModel.$search
    $scope.folders = FolderModel.$collection({populate: "files", sort: "-created_at"}).$refresh();
  };

  $scope.onRefresh();
});

controllers.controller("FolderShowCtrl", function($scope, $routeParams, FolderModel, FileModel) {
  $(window).trigger("resize");

  $scope.folderSlug = $routeParams.folderSlug;

  $scope.onRefresh = function() {
    var folders = FolderModel.$collection({
      populate: "files",
      conditions: JSON.stringify({slug: $scope.folderSlug}),
      limit: 1
    }).$refresh();
    folders.$then(function() {
      $scope.folder = folders[0];
    });
  };

  $scope.deleteFolder = function(folder) {
    folder.$destroy();
  };

  $scope.onRefresh();
});

controllers.controller("FolderCreateCtrl", function($scope, $routeParams, FolderModel, FileModel) {
  $(window).trigger("resize");

  $scope.folder = FolderModel.$build();
  $scope.files = [];

  var file0 = FileModel.$build({name: "foo.js", content: "var x = 2 + 3;"});
  $scope.files.push(file0);
  var file1 = FileModel.$build({name: "bar.js", content: "console.log(\"hello\");"});
  $scope.files.push(file1);

  $scope.addFile = function() {
    var file = FileModel.$build();
    $scope.files.push(file)
  };

  $scope.deleteFile = function(file) {
    $scope.files.splice($scope.files.indexOf(file), 1);
  };

  $scope.createFolder = function() {
    var folder = $scope.folder;
    var files = $scope.files;

    _.each(files, function(file) { file.$save(); });
    var filePromises = _.map(files, function(file) { return file.$promise});

    Q.all(filePromises).then(function() {
      folder.files = files;
      folder.$save().$then(function() {
        var sameFolder = FolderModel.$find(folder.$pk, {populate: "files"});
        console.log(sameFolder);
      });
    });
  }
});

controllers.controller("FolderEditCtrl", function($scope, $routeParams, FolderModel, FileModel) {
  $(window).trigger("resize");

  $scope.folderSlug = $routeParams.folderSlug;

  var folders = FolderModel.$collection({
    populate: "files",
    conditions: JSON.stringify({slug: $scope.folderSlug}),
    limit: 1
  }).$refresh();
  folders.$then(function() {
    $scope.folder = folders[0];
    $scope.files = $scope.folder.files;
  });

  $scope.addFile = function() {
    var file = FileModel.$build();
    $scope.files.push(file)
  };

  $scope.deleteFile = function(file) {
    $scope.files.splice($scope.files.indexOf(file), 1);
  };

  $scope.saveFolder = function() {
    var folder = $scope.folder;
    var files = $scope.files;

    _.each(files, function(file) { file.$save(); });
    var filePromises = _.map(files, function(file) { return file.$promise});

    Q.all(filePromises).then(function() {
      folder.files = files;
      folder.$save().$then(function() {
        var sameFolder = FolderModel.$find(folder.$pk, {populate: "files"});
        console.log(sameFolder);
      });
    });
  }

});
