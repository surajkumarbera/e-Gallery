// move all the controllers from app.js to here

const { joinPath } = require("./utils");
const homePage = () => joinPath("../public/index.html");
const galleryPage = () => joinPath("../public/gallery.html");

const serveHomePage = function (req, res) {
  console.log(`\nGET request for Home Page at ${new Date().toUTCString()}`);
  res.sendFile(homePage());
};

const uploadImageData = function () {};
const serveGallery = function (req, res) {
  console.log(`\nGET request for Gallery Page at ${new Date().toUTCString()}`);
  res.sendFile(galleryPage());
};

module.exports = { serveHomePage, uploadImageData, serveGallery };
