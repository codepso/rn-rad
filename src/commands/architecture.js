"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('../config/questions');
const helper = require('../utils/helper');
const packages = require('../config/packages');
const { spawn } = require('child_process');
const makeDir = require('make-dir');
const fs = require('fs');
const generate = require('./generate');
const log = console.log;

// Environment
let env = 'prod';
const setEnv = (_env) => {
  env = _env;
};

let dependencies = packages.MAIN;

const main = (option) => {
  const args = minimist(process.argv.slice(2));
  switch (option) {
    case 'packages':
      installPackages().then(() => {});
      break;
    case 'project':
      // log('We\'re working on it');
      initProject().then(() => {});
      break;
    case 'auth':
      // log('We\'re working on it');
      initAuth().then((path) => {
        log('The ' + chalk.yellow(path) + ' structure is ' + chalk.yellow('Ready'));
      });
      break;
  }
};

const initProject = async () => {
  try {
    const resource = 'rn-rad.config.js';
    const existsResource = await helper.checkResource(resource);
    if (existsResource) {
      throw {message : chalk.yellow(resource) + ' already exists'};
    }

    const assetsPath = await helper.getAssetsPath(env);
    fs.copyFileSync(assetsPath + 'files/rn-rad.config.js',  'rn-rad.config.js');
  } catch (error) {
    log(helper.getError(error));
    return 'e';
  }
};

const initAuth = async () => {
  try {
    const base = 'src/screens/auth';
    const existsDirectory = await helper.checkDirectory(base);
    if (existsDirectory) {
      throw {message : 'the ' + chalk.yellow(base) + ' directory already exists'};
    }

    let paths = await Promise.all([
      makeDir(base)
    ]);

    // Added .gitkeep
    const assetsPath = await helper.getAssetsPath(env);
    for (let path of paths) {
      fs.copyFileSync(assetsPath + 'files/gitkeep', path + '/.gitkeep');
    }

    // Screens
    const screens = [
      'Welcome',
      'SignIn',
      'SignUp',
      'ResetPassword',
      'ChangePassword'
    ];

    const isSafeAreaView = await helper.checkPackage('react-native-safe-area-view');
    let file = 'component.hbs';
    if (isSafeAreaView) {
      file = 'component-safe-area.hbs';
    }

    for (let screen of screens) {
      const name = screen + 'Screen';
      await generate.template(file, name, base);
    }

    return base;
  } catch (error) {
    log(helper.getError(error));
    return 'e';
  }
};

const installPackages = async () => {
  try {
    const answers = await inquirer.prompt(questions.REDUX);
    if (answers.redux) {
      dependencies = dependencies.concat(packages.REDUX);
    }

    // checking 'react-native-safe-area-view',
    dependencies.unshift('add');
    const yarn = spawn('yarn', dependencies);

    yarn.stdout.on('data', (data) => {
      log(`${data}`);
    });

    yarn.stderr.on('data', (data) => {
      // console.error(`stderr: ${data}`);
    });

    yarn.on('close', (code) => {
      dependencies.shift();
      log('');
      log('The following packages have been ' + chalk.yellow('installed') + ':');
      log('');
      dependencies.forEach(element => log('- ' + element));
      log('');
      log(chalk.yellow('Done!'));
    });

  } catch (error) {
    log(helper.getError(error));
  }
};

module.exports = {
  main,
  setEnv
};
