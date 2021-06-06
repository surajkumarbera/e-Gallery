const {
  isValidRequest,
  homePage,
  uploadPage,
  galleryPage,
  submissionSuccessPage,
  submissionFailurePage,
} = require('./helpers');
const { readGalleryFileContent } = require('./appUtils');

const { updateImagesGallery, removeInvalidImage } = require('./controllers');
// log basic info of request/response
const logger = function (req, res, next) {
  console.log(`Request method : ${req.method}`);
  console.log(`Request URL :  ${req.url}`);
  console.log(`At ${new Date().toLocaleString()}`);
  console.log(`Response statusCode : ${res.statusCode}`);
  console.log('\n======================================');
  next();
};

//serve Home Page
const serveHomePage = function (req, res) {
  res.sendFile(homePage);
};

//serve Upload Page
const serveUploadPage = function (req, res) {
  res.sendFile(uploadPage);
};

// serve submission success page
const serveSubmissionSuccessPage = function (res) {
  res.sendFile(submissionSuccessPage);
};

// serve submission fail page
const serveSubmissionFailPage = function (res) {
  res.sendFile(submissionFailurePage);
};

const getAllImagesDetails = () => {
  const { images } = readGalleryFileContent();
  return Object.values(images).map((img) => {
    const { id, name, submittedBy } = img;
    return {
      id,
      name,
      submittedBy,
    };
  });
};

// serve gallery page
const serveGallery = function (req, res) {
  const allImagesDetails = getAllImagesDetails();
  console.log(JSON.stringify(allImagesDetails), 'all Images Details');
  res.send(JSON.stringify(allImagesDetails));
  // res.sendFile(galleryPage);
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
module.exports = {
  logger,
  serveUploadPage,
  serveHomePage,
  serveGallery,
  serveSubmissionFailPage,
  serveSubmissionSuccessPage,
  uploadImageStoreData,
};
