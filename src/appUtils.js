// node module
const path = require('path');

// project module
const {
  IMAGES_FOLDER_PATH,
  GALLERY_FOLDER_PATH,
  GALLERY_JSON_FILE_PATH,
} = require('./constants');

const {
  checkAndCreateDirectory,
  readFileContent,
  writeFileContent,
  getAbsolutePath,
} = require('./utils');

const imageDir = getAbsolutePath(IMAGES_FOLDER_PATH);
const dataDir = getAbsolutePath(GALLERY_FOLDER_PATH);
const galleryJsonFile = getAbsolutePath(GALLERY_JSON_FILE_PATH);
const createRequiredDirectories = function () {
  createPrivateDirectory();
  createImagesDirectory();
  createDataDirectory();
};
const createPrivateDirectory = function () {
  checkAndCreateDirectory('./private');
};
const createImagesDirectory = function () {
  checkAndCreateDirectory(imageDir);
};
const createDataDirectory = function () {
  checkAndCreateDirectory(dataDir);
};
const readGalleryFileContent = function () {
  const initialContent = { images: {} };
  return readFileContent(galleryJsonFile, initialContent);
};

const writeGalleryFileContent = function (content) {
  writeFileContent(galleryJsonFile, content);
};

// export functions
module.exports = {
  readGalleryFileContent,
  writeGalleryFileContent,
  createRequiredDirectories,
  createImagesDirectory,
  imageDir,
};
