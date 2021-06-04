// node module
const express = require("express");
const expressFormidable = require("express-formidable");

// project module
const {
  serveUploadPage,
  serveHomePage,
  serveGallery,
  uploadImageStoreData,
  logger,
  getTotalImgCount,
  getImg
} = require("./handlers");

const { readGalleryFileContent, imageDir } = require("./appUtils");
const { isEmpty } = require("./utils");
const Gallery = require("./models/Gallery");

const initializeOrRestoreGallery = () => {
  const gallery = new Gallery();
  const galleryData = readGalleryFileContent();
  if (!isEmpty(galleryData)) gallery.setImages(galleryData.images);
  return gallery;
};

// add express-formidable middleware and specify upload directory
const expressFormidableMiddleWare = expressFormidable({
  uploadDir: imageDir,
  multiples: false,
});

// initializing express
const app = express();
// Gallery obj initializing to app
app.locals.gallery = initializeOrRestoreGallery();

// middlewares
app.use(expressFormidableMiddleWare);
app.use(logger);

//app routes
app.get("/", serveHomePage);
app.get("/upload", serveUploadPage);
app.post("/uploadImageAndData", uploadImageStoreData);
app.get("/gallery", serveGallery);
app.get("/totalImgCount", getTotalImgCount);
app.get("/getImg:id", getImg);
// export app
module.exports = app;
