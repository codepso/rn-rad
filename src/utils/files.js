const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};

const clear = require('clear');
const files = require('./src/files');

// clear();
/*
if (files.directoryExists('package.json')) {
  console.log(chalk.red('Already a react project!'));
  process.exit();
}*/
