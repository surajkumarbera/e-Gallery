//project module
const {
  getAbsolutePath,
  isValidRequest,
  updateImagesGallery,
  removeInvalidImg,
} = require("./appUtils");

const {
  HOME_HTML,
  GALLERY_HTML,
  SUBMISSION_SUCCESS_HTML,
  SUBMISSION_FAILURE_HTML,
} = require("./constants");

const homePage = getAbsolutePath(HOME_HTML);
const galleryPage = getAbsolutePath(GALLERY_HTML);
const submissionSuccessPage = getAbsolutePath(SUBMISSION_SUCCESS_HTML);
const submissionFailurePage = getAbsolutePath(SUBMISSION_FAILURE_HTML);

const logger = function (req, res, next) {
  console.log(`Request method : ${req.method}`);
  console.log(`Request URL :  ${req.url}`);
  console.log(`At ${new Date().toLocaleString()}`);
  console.log(`Response statusCode : ${res.statusCode}`);
  console.log("\n======================================");
  next();
};
//serve Home Page
const serveHomePage = function (req, res) {
  res.sendFile(homePage);
};

//serve submission success page
const serveSubmissionSuccessPage = function (req, res) {
  res.sendFile(submissionSuccessPage);
};

//serve submission fail page
const serveSubmissionFailPage = function (req, res) {
  res.sendFile(submissionFailurePage);
};

//serve gallery page
const serveGallery = function (req, res) {
  res.sendFile(galleryPage);
};

const uploadImageData = function (req, res) {
  const { gallery } = req.app.locals;
  if (isValidRequest(req)) {
    if (updateImagesGallery(req, gallery)) {
      serveSubmissionSuccessPage(req, res);
    } else {
      serveSubmissionFailPage(req, res);
    }
  } else {
    removeInvalidImg(req);
    serveSubmissionFailPage(req, res);
  }
};

// export controllers
module.exports = {
  logger,
  serveHomePage,
  serveSubmissionSuccessPage,
  serveSubmissionFailPage,
  serveGallery,
  uploadImageData,
};
