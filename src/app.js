const express = require("express");
const expressFormidable = require("express-formidable");
const path = require("path");
const fs = require("fs");

const {
  IMAGE_STORAGE_FOLDER_PATH,
  GALLERY_DETAILS_FILE_PATH,
} = require("./constants");
//checking required files
if (!fs.existsSync(IMAGE_STORAGE_FOLDER_PATH)) {
  fs.mkdirSync(GALLERY_DETAILS_FILE_PATH);
}
if (!fs.existsSync(GALLERY_DETAILS_FILE_PATH)) {
  fs.writeFileSync(GALLERY_DETAILS_FILE_PATH, "[]");
}

//get the previous gallery data
var galleryDetails = require("../private/data/galleryDetails.json");

//init express
const app = express();

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
  if (
    req.fields["title"] == "" ||
    req.fields["description"] == "" ||
    req.fields["submittedBy"] == "" ||
    req.files.img.name == ""
  ) {
    console.log(
      `\nA bad POST request for Image Submission at ${new Date().toUTCString()}`
    );
    res.send(
      "<h1>Image has not been Submitted<br>Fill All The Fields Carefully</h1>"
    );
  } else {
    console.log(
      `\nPOST request no. ${
        galleryDetails.length + 1
      } for Image Submission at ${new Date().toUTCString()}`
    );
    fs.renameSync(
      req.files.img.path,
      path.join(
        __dirname,
        "../private/images",
        "img" +
          String(galleryDetails.length) +
          "." +
          path.parse(req.files.img.name).ext
      )
    );
    galleryDetails.push({
      imgID: galleryDetails.length,
      title: req.fields["title"],
      description: req.fields["description"],
      submittedBy: req.fields["submittedBy"],
    });
    const jsonstr = JSON.stringify(galleryDetails);
    fs.writeFileSync(GALLERY_DETAILS_FILE_PATH, jsonstr);
    res.send("<h1>Image has been Submitted Successfully</h1>");
  }
});

module.exports = app;
