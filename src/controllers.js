//project module
const { getAbsolutePath } = require("./appUtils");

const homePage = getAbsolutePath("./public/home.html");
const submissionSuccessPage = getAbsolutePath("./public/submissionSuccess.html");
const submissionFailurePage = getAbsolutePath("./public/submissionFail.html");
const galleryPage = getAbsolutePath("./public/gallery.html");

//serve Home Page
const serveHomePage = function (res) {
  console.log(`Serving Home Page at ${new Date().toUTCString()}`);
  res.sendFile(homePage);
};

//serve submission success page
const serveSubmissionSuccessPage = function (res) {
  console.log(`Serving Submission Success Page at ${new Date().toUTCString()}`);
  res.sendFile(submissionSuccessPage);
};

//serve submission fail page
const serveSubmissionFailPage = function (res) {
  console.log(`Serving Submission Fail Page at ${new Date().toUTCString()}`);
  res.sendFile(submissionFailurePage);
};

//serve gallery page
const serveGallery = function (res) {
  console.log(`Serving Gallery Page at ${new Date().toUTCString()}`);
  res.sendFile(galleryPage);
};

// export controllers
module.exports = {
  serveHomePage,
  serveSubmissionSuccessPage,
  serveSubmissionFailPage,
  serveGallery,
};
