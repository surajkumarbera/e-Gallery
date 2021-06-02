const fs = require("fs");
const path = require("path");

const { 
  IMAGES_FOLDER_PATH,
  GALLERY_FOLDER_PATH,
  GALLERY_JSON_FILE_PATH
} = require("./constants");
const {
  check_create_dirs,
  check_create_file,
  formatImgFileName,
  json_write
} = require("./utils");
const Image = require("./models/Image");
//validate req of img submission
const req_isValid = (req) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;

  return (!(
    title == "" || description == "" || submittedBy == "" || img.name == ""
  ));
};

//check and create imgs directory to store img files
const check_create_imgsdir = () => {
  check_create_dirs(IMAGES_FOLDER_PATH);
};

// check and create gallery.json file to store gallery data
const check_create_galleryJSON = () => {
  check_create_dirs(GALLERY_FOLDER_PATH);
  check_create_file(GALLERY_JSON_FILE_PATH);
};

// update img in imgs folder and json file of gallery data
const update_imgs_gallery = (req, gallery) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;
  try {
    fs.renameSync(img.path, formatImgFileName(gallery.getImagesCount(), img.name));
    console.log(`File rename successful`)
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
  json_write(gallery);
  console.log(`json update successful`, gallery);
  return true;
};

//remove img file of invalid submission request
const removeInvalidImg = (req) => {
  const { img } = req.files;
  try {
    fs.unlinkSync(img.path);
    console.log(`invalid img file deleted`)
  } catch (err) {
    console.log(arr);
    return false;
  }
  return true;
};

const abs_path = (rel_path) => {
  return path.join(__dirname, "../", rel_path);
}

const abs_imgdir_path = () => {
  let str =  path.join(__dirname, "../", IMAGES_FOLDER_PATH);
  return str;
}
// export functions
module.exports = {
  req_isValid,
  check_create_imgsdir,
  check_create_galleryJSON,
  update_imgs_gallery,
  removeInvalidImg,
  abs_imgdir_path,
  abs_path
};
