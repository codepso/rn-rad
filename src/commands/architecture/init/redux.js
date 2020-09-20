"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/redux/actions/user.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/redux/actions/user.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/redux/reducers/index.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/redux/reducers/index.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' hasn\'t been copied because it exists');
    }

    const file3 = 'src/redux/reducers/user.js';
    if (!fs.pathExistsSync(file3)) {
      fs.copySync(rootPath + 'assets/redux/reducers/user.js',  file3);
    } else {
      logs.push(chalk.yellow(file3) + ' hasn\'t been copied because it exists');
    }

    const file4 = 'src/redux/types/index.js';
    if (!fs.pathExistsSync(file4)) {
      fs.copySync(rootPath + 'assets/redux/types/index.js',  file4);
    } else {
      logs.push(chalk.yellow(file4) + ' hasn\'t been copied because it exists');
    }

    const file5 = 'src/redux/state.js';
    if (!fs.pathExistsSync(file5)) {
      fs.copySync(rootPath + 'assets/redux/state.js',  file5);
    } else {
      logs.push(chalk.yellow(file5) + ' hasn\'t been copied because it exists');
    }

    const file6 = 'src/redux/store.js';
    if (!fs.pathExistsSync(file6)) {
      fs.copySync(rootPath + 'assets/redux/store.js',  file6);
    } else {
      logs.push(chalk.yellow(file6) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
