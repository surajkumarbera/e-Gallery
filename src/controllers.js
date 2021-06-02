//project module
const { abs_path } = require("./appUtils");

//serve Home Page
const serveHomePage = function (res) {
  console.log(`Serving Home Page at ${new Date().toUTCString()}`);
  res.sendFile(abs_path("./public/home.html"));
};

//serve submission success page
const serveSubmissionSuccessPage = function (res) {
  console.log(`Serving Submission Success Page at ${new Date().toUTCString()}`);
  res.sendFile(abs_path("./public/submissionSuccess.html"));
};

//serve submission fail page
const serveSubmissionFailPage = function (res) {
  console.log(`Serving Submission Fail Page at ${new Date().toUTCString()}`);
  res.sendFile(abs_path("./public/submissionFail.html"));
};

//serve gallery page
const serveGallery = function (res) {
  console.log(`Serving Gallery Page at ${new Date().toUTCString()}`);
  res.sendFile(abs_path("./public/gallery.html"));
};

// export serve page functions
module.exports = {
  serveHomePage,
  serveSubmissionSuccessPage,
  serveSubmissionFailPage,
  serveGallery
};
