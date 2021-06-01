const express = require("express");
const expressFormidable = require("express-formidable");
const path = require("path");
const fs = require("fs");

const { createImageStorage, createGalleryStorage } = require("./appUtils");
const { GALLERY_PATH } = require("./constants");
const Gallery = require("./models/Gallery");
const Image = require("./models/Image");

//checking required files
createImageStorage();
createGalleryStorage();

//init express
const app = express();
const gallery = new Gallery();
app.gallery = gallery;

//add middleware
app.use(
  expressFormidable({
    uploadDir: path.join(__dirname, "../private/images"),
    multiples: false,
  })
);

//app route
app.get("/", (req, res) => {
  console.log(`\nGET request for Home Page at ${new Date().toUTCString()}`);
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/uploadImageAndData", (req, res) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;

  if (title == "" || description == "" || submittedBy == "" || img.name == "") {
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
    fs.renameSync(
      img.path,
      path.join(
        __dirname,
        "../private/images",
        `img${String(gallery.getImagesCount())}${
          path.parse(req.files.img.name).ext
        }`
      )
    );

    gallery.addImage(
      new Image(gallery.getImagesCount(), title, description, submittedBy)
    );

    const jsonstr = JSON.stringify(gallery);
    fs.writeFileSync(GALLERY_PATH, jsonstr);
    res.send("<h1>Image has been Submitted Successfully</h1>");
  }
});

app.get("/gallery", (req, res) => {
  console.log(`\nGET request for Gallery Page at ${new Date().toUTCString()}`);
  res.sendFile(path.join(__dirname, "../public/gallery.html"));
});

module.exports = app;
