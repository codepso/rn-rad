"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/assets/styles/app.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/files/assets/styles/app.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/assets/styles/form.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/files/assets/styles/form.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' hasn\'t been copied because it exists');
    }

    const file3 = 'src/assets/styles/drawer.js';
    if (!fs.pathExistsSync(file3)) {
      fs.copySync(rootPath + 'assets/files/assets/styles/drawer.js',  file3);
    } else {
      logs.push(chalk.yellow(file3) + ' hasn\'t been copied because it exists');
    }

    const file4 = 'src/assets/styles/sign-in.js';
    if (!fs.pathExistsSync(file4)) {
      fs.copySync(rootPath + 'assets/files/assets/styles/sign-in.js',  file4);
    } else {
      logs.push(chalk.yellow(file4) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
