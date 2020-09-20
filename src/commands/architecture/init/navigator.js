"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/navigator/AppNavigator.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/navigator/AppNavigator.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/navigator/AuthNavigator.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/navigator/AuthNavigator.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' hasn\'t been copied because it exists');
    }

    const file3 = 'src/navigator/MainNavigator.js';
    if (!fs.pathExistsSync(file3)) {
      fs.copySync(rootPath + 'assets/navigator/MainNavigator.js',  file3);
    } else {
      logs.push(chalk.yellow(file3) + ' hasn\'t been copied because it exists');
    }

    const file4 = 'src/navigator/RootNavigation.js';
    if (!fs.pathExistsSync(file4)) {
      fs.copySync(rootPath + 'assets/navigator/RootNavigation.js',  file4);
    } else {
      logs.push(chalk.yellow(file4) + ' hasn\'t been copied because it exists');
    }

    const file5 = 'src/navigator/DrawerContent.js';
    if (!fs.pathExistsSync(file5)) {
      fs.copySync(rootPath + 'assets/navigator/DrawerContent.js',  file5);
    } else {
      logs.push(chalk.yellow(file5) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
