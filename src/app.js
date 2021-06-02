const express = require("express");
const expressFormidable = require("express-formidable");

const {
  serveHomePage,
  serveSubmissionSuccessPage,
  serveSubmissionFailPage,
  serveGallery
} = require("./controllers");
const {
  req_isValid,
  check_create_imgsdir,
  check_create_galleryJSON,
  update_imgs_gallery,
  removeInvalidImg,
  abs_imgdir_path
} = require("./appUtils");
const Gallery = require("./models/Gallery");



//check and create required folder for images and required json file for Gallery data
check_create_imgsdir();
check_create_galleryJSON();

//initializing express
const app = express();

// Gallery obj initializing to app
const gallery = new Gallery();
app.locals.gallery = gallery;

//add express-formidable middleware and specify upload directory
app.use(
  expressFormidable({
    uploadDir: abs_imgdir_path(),
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
  if (req_isValid(req)) {
    if (update_imgs_gallery(req, app.locals.gallery)) {
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
