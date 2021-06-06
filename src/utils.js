//node module
const path = require('path');
const fs = require('fs');

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

//get absolute path
const getAbsolutePath = (relativePath) => {
  return path.join(__dirname, '../', relativePath);
};

const checkAndCreateDirectory = function (directoryPath) {
  if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
};

const readFileContent = function (filePath, initialContent) {
  if (!fs.existsSync(filePath)) writeFileContent(filePath, initialContent);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

const writeFileContent = function (path, content) {
  const stringifiedContent = JSON.stringify(content);
  fs.writeFileSync(path, stringifiedContent, 'utf-8');
};

const renameFile = function (oldPath, newPath) {
  fs.renameSync(oldPath, newPath);
};

const unlinkFile = function (pathToBeUnlinked) {
  fs.unlinkSync(pathToBeUnlinked);
};

// export functions
module.exports = {
  checkAndCreateDirectory,
  renameFile,
  readFileContent,
  writeFileContent,
  unlinkFile,
  getAbsolutePath,
  isEmpty,
};
