"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/app/state.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/app/state.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/app/reducers/app.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/app/reducers/app.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
