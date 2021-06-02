//node module
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const { GALLERY_JSON_FILE_PATH } = require("./constants");

// check and create dir
const checkAndCreateDirectory = (rel_path) => {
  let absolutePath = path.join(__dirname, "../"); // root directory
  if (!fs.existsSync(path.join(absolutePath, rel_path))) {
    let dirs = rel_path.split("/");
    for (let i = 0; i < dirs.length; i++) {
      let dir = dirs[i];
      absolutePath = path.join(absolutePath, dir);
      if (!fs.existsSync(absolutePath)) {
        try {
          fs.mkdirSync(absolutePath);
          console.log(`${dir} directory created`);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};

// check and create file
const checkAndCreateFile = (rel_path) => {
  let absolutePath = path.join(__dirname, "../", rel_path); // absolute file path
  if (!fs.existsSync(absolutePath)) {
    try {
      fs.writeFileSync(absolutePath, "");
      console.log(`${rel_path} file created`);
    } catch (err) {
      console.log(err);
    }
  }
};

const formatImgFileName = (num, imgName) => {
  let formatedImgName = path.join(
    __dirname,
    "../private/images",
    "img" + String(num) + path.parse(imgName).ext
  );
  return formatedImgName;
};

const readJson = () => {
  let jsonPath = path.join(__dirname, "../", GALLERY_JSON_FILE_PATH);
  try {
    let jsonStr = fs.readFileSync(jsonPath, "utf-8");
    return jsonStr;
  } catch (err) {
    console.log(err);
    exit;
  }
};

const writeJson = (jsonObj) => {

  let jsonPath = path.join(__dirname, "../", GALLERY_JSON_FILE_PATH);
  let jsonStr = JSON.stringify(jsonObj);
  try {
    fs.writeFileSync(jsonPath, jsonStr, "utf-8");
    return jsonStr;
  } catch (err) {
    console.log(err);
    exit(1);
  }
};

const createJsonObject = () => {
  let jsonstr = readJson();
  let jsonObj = JSON.parse(jsonstr);
  return jsonObj;
};

// export functions
module.exports = {
  checkAndCreateDirectory,
  checkAndCreateFile,
  formatImgFileName,
  readJson,
  createJsonObject,
  writeJson,
};
