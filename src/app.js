//node module
const express = require("express");
const expressFormidable = require("express-formidable");
//project module
const {
  serveHomePage,
  serveSubmissionSuccessPage,
  serveSubmissionFailPage,
  serveGallery,
} = require("./controllers");
const {
  removeInvalidImg,
  getAbsoluteImgDirPath,
  updateImagesGallery,
  isValidRequest,
  createGalleryJSON,
  createImageDirectory,
} = require("./appUtils");

const Gallery = require("./models/Gallery");

//check and create required folder for images and required json file for Gallery data
createImageDirectory();
createGalleryJSON();

//initializing express
const app = express();

// Gallery obj initializing to app
const gallery = new Gallery();
app.locals.gallery = gallery;

//add express-formidable middleware and specify upload directory
app.use(
  expressFormidable({
    uploadDir: getAbsoluteImgDirPath(),
    multiples: false,
  })
);

//app route
app.get("/", (req, res) => {
  console.log(`\nRequest for Home Page at ${new Date().toUTCString()}`);
  serveHomePage(res);
});

app.post("/uploadImageAndData", (req, res) => {
  console.log(`\nRequest for Image Upload at ${new Date().toUTCString()}`);
  if (isValidRequest(req)) {
    if (updateImagesGallery(req, app.locals.gallery)) {
      serveSubmissionSuccessPage(res);
    } else {
      serveSubmissionFailPage(res);
    }
  } else {
    removeInvalidImg(req);
    serveSubmissionFailPage(res);
  }
});

app.get("/gallery", (req, res) => {
  console.log(`\nRequest for Gallery at ${new Date().toUTCString()}`);
  serveGallery(res);
});

// export app
module.exports = app;
