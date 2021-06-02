//node module
const express = require("express");
const expressFormidable = require("express-formidable");

//project module
const {
  serveHomePage,
  serveGallery,
  uploadImageData,
  logger,
} = require("./controllers");
const {
  getAbsoluteImgDirPath,
  createGalleryJSON,
  createImageDirectory,
} = require("./appUtils");
const {
  readJson,
  createJsonObject
} = require("./utils");
const Gallery = require("./models/Gallery");

//check and create required folder for images and required json file for Gallery data
createImageDirectory();
createGalleryJSON();

//initializing express
const app = express();

// Gallery obj initializing to app
const gallery = new Gallery();
if(readJson() !== "") {
  gallery.images = createJsonObject().images;
}
app.locals.gallery = gallery;

//add express-formidable middleware and specify upload directory
app.use(
  expressFormidable({
    uploadDir: getAbsoluteImgDirPath(),
    multiples: false,
  })
);
app.use(logger);


//app routes
app.get("/", serveHomePage);
app.post("/uploadImageAndData", uploadImageData);
app.get("/gallery", serveGallery);


// export app
module.exports = app;
