const express = require("express");
const expressFormidable = require("express-formidable");
const fs = require("fs");

const {
  createImageStorage,
  createGalleryStorage,
  areMandatoryFieldsMissing,
  formatFileName,
  writeContent,
} = require("./appUtils");

const { joinPath } = require("./utils");
const { serveHomePage, serveGallery } = require("./controllers");

const { GALLERY_PATH } = require("./constants");
const Gallery = require("./models/Gallery");
const Image = require("./models/Image");

const imagesDirectory = () => joinPath("../private/images");

//checking required files
createImageStorage();
createGalleryStorage();

//init express
const app = express();
const gallery = new Gallery();
app.locals.gallery = gallery;

//add middleware
app.use(
  expressFormidable({
    uploadDir: imagesDirectory(),
    multiples: false,
  })
);

//app route
app.get("/", serveHomePage);

app.post("/uploadImageAndData", (req, res) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;
  const { gallery } = req.app.locals;

  if (areMandatoryFieldsMissing(req)) {
    console.log(
      `\nA bad POST request for Image Submission at ${new Date().toUTCString()}`
    );
    res.send(
      "<h1>Image has not been Submitted<br>Fill All The Fields Carefully</h1>"
    );
  } else {
    console.log(
      `\nPOST request no. ${
        gallery.getImagesCount() + 1
      } for Image Submission at ${new Date().toUTCString()}`
    );

    const fileName = formatFileName(img, gallery.getImagesCount());
    fs.renameSync(img.path, fileName);

    const uploadedImage = new Image(
      gallery.getImagesCount(),
      title,
      description,
      submittedBy
    );
    gallery.addImage(uploadedImage);
    writeContent(GALLERY_PATH, gallery, fs);

    res.send("<h1>Image has been Submitted Successfully</h1>");
  }
});

app.get("/gallery", serveGallery);

module.exports = app;
