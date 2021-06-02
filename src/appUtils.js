//node module
const fs = require("fs");
const path = require("path");
//project module
const {
  IMAGES_FOLDER_PATH,
  GALLERY_FOLDER_PATH,
  GALLERY_JSON_FILE_PATH,
} = require("./constants");
const {
  formatImgFileName,
  checkAndCreateDirectory,
  writeJson,
  checkAndCreateFile,
} = require("./utils");
const Image = require("./models/Image");

//validate req of img submission
const isValidRequest = (req) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;

  return !(
    title == "" ||
    description == "" ||
    submittedBy == "" ||
    img.name == ""
  );
};

//check and create imgs directory to store img files
const createImageDirectory = () => {
  checkAndCreateDirectory(IMAGES_FOLDER_PATH);
};

// check and create gallery.json file to store gallery data
const createGalleryJSON = () => {
  checkAndCreateDirectory(GALLERY_FOLDER_PATH);
  checkAndCreateFile(GALLERY_JSON_FILE_PATH);
};

// update img in imgs folder and json file of gallery data
const updateImagesGallery = (req, gallery) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;
  try {
    fs.renameSync(
      img.path,
      formatImgFileName(gallery.getImagesCount(), img.name)
    );
    console.log(`File rename successful`);
  } catch (err) {
    console.log(err);
    return false;
  }
  const uploadedImage = new Image(
    gallery.getImagesCount(),
    title,
    description,
    submittedBy
  );
  gallery.addImage(uploadedImage);
  writeJson(gallery);
  console.log(`json update successful`);
  return true;
};

//remove img file of invalid submission request
const removeInvalidImg = (req) => {
  const { img } = req.files;
  try {
    fs.unlinkSync(img.path);
    console.log(`invalid img file deleted`);
  } catch (err) {
    console.log(arr);
    return false;
  }
  return true;
};

//get absolute path
const getAbsolutePath = (rel_path) => {
  return path.join(__dirname, "../", rel_path);
};

// absolute path for image folder
const getAbsoluteImgDirPath = () => {
  let str = getAbsolutePath(IMAGES_FOLDER_PATH);
  return str;
};

// export functions
module.exports = {
  isValidRequest,
  createImageDirectory,
  createGalleryJSON,
  updateImagesGallery,
  removeInvalidImg,
  getAbsoluteImgDirPath,
  getAbsolutePath,
};
