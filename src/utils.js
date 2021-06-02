const path = require("path");

const joinPath = function (pathToJoin) {
  return path.join(__dirname, pathToJoin);
};

module.exports = { joinPath };
