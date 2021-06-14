// node module
const express = require('express');
const expressFormidable = require('express-formidable');

// project module
const {
  serveUploadPage,
  serveHomePage,
  serveGallery,
  uploadImageStoreData,
  logger,
} = require('./handlers');

const { readGalleryFileContent, imageDir } = require('./appUtils');
const { isEmpty } = require('./utils');
const Gallery = require('./models/Gallery');

const initializeOrRestoreGallery = () => {
  const gallery = new Gallery();
  const galleryData = readGalleryFileContent();
  if (!isEmpty(galleryData)) gallery.setImages(galleryData.images);
  return gallery;
};

// initializing express
const app = express();
// Gallery obj initializing to app
app.locals.gallery = initializeOrRestoreGallery();

// middlewares
// for html and js assets
app.use(express.static('public'));
// for images assets
app.use(express.static('private/images'));
// add express-formidable middleware and specify upload directory
app.use(
  expressFormidable({
    uploadDir: imageDir,
    multiples: false,
  })
);
app.use(logger);

// app routes
app.get('/', serveHomePage);
app.get('/upload', serveUploadPage);
app.post('/uploadImageAndData', uploadImageStoreData);
app.get('/gallery', serveGallery);

// export app
module.exports = app;
