const path = require("path");
const fs = require("fs");

const { IMAGE_STORAGE_PATH, GALLERY_PATH } = require("./constants");

const writeContent = function (path, content, fileSystem = fs) {
  const jsonstr = JSON.stringify(content);
  fileSystem.writeFileSync(path, jsonstr);
};

const createImageStorage = function () {
  if (!fs.existsSync(IMAGE_STORAGE_PATH)) {
    let dirs = IMAGE_STORAGE_PATH.split("/");
    let absolutePath = path.join(__dirname, "../"); // root directory
    dirs.forEach((dir) => {
      absolutePath = path.join(absolutePath, dir);
      if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath);
      }
    });
  }
};

const createGalleryStorage = function () {
  if (!fs.existsSync(GALLERY_PATH)) {
    let dirs = GALLERY_PATH.split("/");
    let absolutePath = path.join(__dirname, "../"); // root directory
    dirs.forEach((dir) => {
      absolutePath = path.join(absolutePath, dir);
      if (dir == "gallery.json") {
        writeContent(absolutePath, "[]");
      } else if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath);
      }
    });
  }
};

const areMandatoryFieldsMissing = function (request) {
  const { title, description, submittedBy } = request.fields;
  const { img } = request.files;
  return (
    title == "" || description == "" || submittedBy == "" || img.name == ""
  );
};

const formatFileName = function (image, imageNumber) {
  const { name } = image;
  return path.join(
    __dirname,
    "../private/images",
    `img${imageNumber}${path.parse(name).ext}`
  );
};

module.exports = {
  createImageStorage,
  createGalleryStorage,
  areMandatoryFieldsMissing,
  formatFileName,
  writeContent,
};
