# PasteStore [![GitHub version](https://badge.fury.io/gh/hastebrot%2FPasteStore.png)](http://badge.fury.io/gh/hastebrot%2FPasteStore)

:warning: *This software is currently in alpha phase, incomplete and not yet ready for production.*

**PasteStore** stores files in folders. You can browse (`/#/browse`), retrieve (`/raw`) and
modify (`/api`) folders and their files.


## Web Routes

Web frontend:

- `/#/browse`: List folders.
- `/#/browse/:folderSlug`: Show folder.
- `/#/browse/:folderSlug/edit`: Edit folder.
- `/#/browse/create`: Create folder.

File service:

- `/raw/:folderSlug/:fileName`: Retrieve file contents.

RESTful service:

- `/api/folders`: List folders.
- `/api/folders?populate=files`: List folders with files.
- `/api/folders?populate=files&sort=-created_at&limit=10`: List newest folders with files.
- `/api/files`: List files.
- `/api/folders/:id`: Show folder.
- `/api/folders/:id?populate=files`: Show folder with files.

RESTful service documentation:

- `/api/api-docs`: Retrieve service documentation.
- `/bower_components/swagger-ui/dist/index.html`: Explore service documentation.


## Data Schema

~~~js
var Folder = {
  "_id":        ObjectId,
  "__v":        Number,
  "slug":       String,
  "files":      [File],
  "created_at": Date,
  "updated_at": Date
}

var File = {
  "_id":        ObjectId,
  "__v":        Number,
  "name":       String,
  "type":       String,
  "content":    Buffer,
  "created_at": Date,
  "updated_at": Date
}
~~~


## TODO

- (done) Implement web service to create, modify and delete folders and files.

- Implement view in frontend to browse folders and view truncated file contents.
- Implement view to view folder and its file contents.
- Implement actions to create and delete a folder.
- Implement actions to add, modify and delete files.

- Add user accounts and user folders.
- Add file versioning.


## Third Party Documentation

Database:

- https://github.com/LearnBoost/mongoose
- http://mongoosejs.com/docs/api.html
- http://mongoosejs.com/docs/guide.html

RESTful service:

- https://github.com/wprl/baucis
- https://github.com/platanus/angular-restmod

Frontend:

- http://lodash.com/docs
