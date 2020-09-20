"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    const file1 = 'src/themes/main';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/files/themes/main',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/themes/index.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/files/themes/index.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' directory hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
