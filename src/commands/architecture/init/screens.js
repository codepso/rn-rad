"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');

const init = async (rootPath) => {
  try {
    let logs = [];

    let file1 = 'src/screens/HomeScreen.js';
    if (!fs.pathExistsSync(file1)) {
      fs.copySync(rootPath + 'assets/screens/HomeScreen.js',  file1);
    } else {
      logs.push(chalk.yellow(file1) + ' hasn\'t been copied because it exists');
    }

    const file2 = 'src/screens/SignInScreen.js';
    if (!fs.pathExistsSync(file2)) {
      fs.copySync(rootPath + 'assets/screens/SignInScreen.js',  file2);
    } else {
      logs.push(chalk.yellow(file2) + ' hasn\'t been copied because it exists');
    }

    const file3 = 'src/screens/SignOutScreen.js';
    if (!fs.pathExistsSync(file3)) {
      fs.copySync(rootPath + 'assets/screens/SignOutScreen.js',  file3);
    } else {
      logs.push(chalk.yellow(file3) + ' hasn\'t been copied because it exists');
    }

    const file4 = 'src/screens/SplashScreen.js';
    if (!fs.pathExistsSync(file4)) {
      fs.copySync(rootPath + 'assets/screens/SplashScreen.js',  file4);
    } else {
      logs.push(chalk.yellow(file4) + ' hasn\'t been copied because it exists');
    }

    const file5 = 'src/screens/WelcomeScreen.js';
    if (!fs.pathExistsSync(file5)) {
      fs.copySync(rootPath + 'assets/screens/WelcomeScreen.js',  file5);
    } else {
      logs.push(chalk.yellow(file5) + ' hasn\'t been copied because it exists');
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {init};
