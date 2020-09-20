"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    // Assets
    const file1 = 'src/assets/images/logo.png';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/files/assets/images/logo.png',  file1);
      fs.copySync(rootPath + 'assets/files/assets/images/logo@2x.png',  'src/assets/images/logo@2x.png');
      fs.copySync(rootPath + 'assets/files/assets/images/logo@3x.png',  'src/assets/images/logo@3x.png');
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
