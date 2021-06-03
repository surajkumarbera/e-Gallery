const {
  isValidRequest,
  homePage,
  galleryPage,
  submissionSuccessPage,
  submissionFailurePage,
} = require("./helpers");

const { updateImagesGallery, removeInvalidImage } = require("./controllers");
// log basic info of request/response
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

// serve submission success page
const serveSubmissionSuccessPage = function (res) {
  res.sendFile(submissionSuccessPage);
};

// serve submission fail page
const serveSubmissionFailPage = function (res) {
  res.sendFile(submissionFailurePage);
};

// serve gallery page
const serveGallery = function (req, res) {
  res.sendFile(galleryPage);
};

const uploadImageStoreData = function (req, res) {
  if (isValidRequest(req)) {
    updateImagesGallery(req);
    serveSubmissionSuccessPage(res);
  } else {
    removeInvalidImage(req);
    serveSubmissionFailPage(res);
  }
};

// get total img count from gallery obj length
const getTotalImgCount = function(req, res) {
  res.send("100");
} ;

module.exports = {
  logger,
  serveHomePage,
  serveGallery,
  serveSubmissionFailPage,
  serveSubmissionSuccessPage,
  uploadImageStoreData,
  getTotalImgCount
};
