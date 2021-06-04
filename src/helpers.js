const fs = require("fs");
const path = require("path");
const { getAbsolutePath } = require("./utils");

const {
  HOME_HTML,
  GALLERY_HTML,
  SUBMISSION_SUCCESS_HTML,
  SUBMISSION_FAILURE_HTML,
  UPLOAD_HTML
} = require("./constants");

const homePage = getAbsolutePath(HOME_HTML);
const uploadPage = getAbsolutePath(UPLOAD_HTML);
const galleryPage = getAbsolutePath(GALLERY_HTML);
const submissionSuccessPage = getAbsolutePath(SUBMISSION_SUCCESS_HTML);
const submissionFailurePage = getAbsolutePath(SUBMISSION_FAILURE_HTML);

const generateFileName = (imgNo, img) => {
  const fileExtension = path.parse(img.name).ext;
  return `img${imgNo}${fileExtension}`;
};
// get formatted file name
const formatImgFileName = (imgName) => {
  let formatedImgName = path.join(__dirname, "../private/images", imgName);
  return formatedImgName;
};

// validate req of img submission
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

module.exports = {
  homePage,
  uploadPage,
  galleryPage,
  submissionSuccessPage,
  submissionFailurePage,
  isValidRequest,
  formatImgFileName,
  generateFileName,
};
