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
    case 'structure':
      initStructure().then(() => {
        //log(chalk.white('The directory structure: ') + chalk.black.bgGreen.bold(' Is Ready '));
        log('The directory structure is ' + chalk.yellow('Ready'));
      });
      break;
    case 'project':
      // log('We\'re working on it');
      initProject().then(() => {
        log('The project has been' + chalk.yellow('initialized'));
      });
      break;
    case 'auth':
      // log('We\'re working on it');
      initAuth().then((path) => {
        log('The ' + chalk.yellow(path) + ' structure is ' + chalk.yellow('Ready'));
      });
      break;
  }
};

const initStructure = async () => {
  try {
    const base = 'src/';
    const existsDirectory = await helper.checkDirectory(base);
    if (existsDirectory) {
      throw {message : 'the ' + chalk.yellow('src') + ' directory already exists'};
    }

    // Check if have package.json and if it is react native project
    let isRedux = await helper.checkPackage('redux');
    if (!isRedux) {
      const answers = await inquirer.prompt(questions.REDUX);
      if (answers.redux) {
        isRedux = true;
      }
    }

    const assetsPath = await helper.getRootPath(env) + 'assets/';
    let paths = await Promise.all([
      makeDir(base + 'services'),
      makeDir(base + 'forms'),
      makeDir(base + 'environments'),
      makeDir(base + 'components'),
      makeDir(base + 'screens'),
      makeDir(base + 'models'),
      makeDir(base + 'navigation'),
      makeDir(base + 'helpers'),
      makeDir(base + 'theme'),
      makeDir(base + 'assets/styles'),
      makeDir(base + 'assets/html'),
      makeDir(base + 'assets/images'),
      makeDir(base + 'assets/sounds'),
    ]);

    let reduxPaths = [];
    if (isRedux) {
      reduxPaths = await Promise.all([
        makeDir(base + 'redux'),
        makeDir(base + 'redux/reducers'),
        makeDir(base + 'redux/actions'),
        makeDir(base + 'redux/types'),
      ]);
    }
    paths = paths.concat(reduxPaths);

    // Added .gitkeep
    for (let path of paths) {
      fs.copyFileSync(assetsPath + 'files/gitkeep', path + '/.gitkeep');
    }

    // Added environment
    fs.copyFileSync(assetsPath + 'files/environments/environment.ts', base + 'environments/environment.ts');
    fs.copyFileSync(assetsPath + 'files/environments/index.js', base + 'environments/index.js');
  } catch (error) {
    log(helper.getError(error));
  }
};

const initProject = async () => {
  try {
    const resource = 'rn-rad.config.js';
    const existsResource = await helper.checkResource(resource);
    if (existsResource) {
      throw {message : chalk.yellow(resource) + ' already exists'};
    }

    const assetsPath = await helper.getRootPath(env) + 'assets/';
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
    const assetsPath = await helper.getRootPath(env) + 'assets/';
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
      installPods(dependencies).then(() => {});
    });

  } catch (error) {
    log(helper.getError(error));
  }
};

const installPods = async (dependencies) => {
  const npx = spawn('npx', ['pod-install', 'ios']);
  npx.stdout.on('data', (data) => {
    log(`${data}`);
  });

  npx.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  npx.on('close', (code) => {
    log('The following packages have been ' + chalk.yellow('installed') + ' (pod\'s included):');
    log('');
    dependencies.forEach(element => log('- ' + element));
    log('');
    log(chalk.yellow('Done!'));
  });
};

module.exports = {
  main,
  setEnv
};
