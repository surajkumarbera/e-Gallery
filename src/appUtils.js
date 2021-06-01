const path = require("path");
const fs = require("fs");
const { IMAGE_STORAGE_PATH, GALLERY_PATH } = require("./constants");

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
        fs.writeFileSync(absolutePath, "[]");
      } else if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath);
      }
    });
  }
};

module.exports = { createImageStorage, createGalleryStorage };
