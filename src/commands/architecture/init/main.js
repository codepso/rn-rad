"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/Main.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/Main.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'App.js';
    if (fs.pathExistsSync(file2)) {
      logs.push(chalk.yellow(file2) + ' has been replaced');
    }
    fs.copySync(rootPath + 'assets/App.js',  file2);

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
