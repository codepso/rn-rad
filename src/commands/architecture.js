"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('../config/questions');
const helper = require('../utils/helper');
const packages = require('../config/packages');
const { spawn } = require('child_process');
const makeDir = require('make-dir');
const fs = require('fs-extra');
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
      installPackages(args).then((args) => {}, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
      });
      break;
    case 'structure':
      initStructure(args).then(() => {
        //log(chalk.white('The directory structure: ') + chalk.black.bgGreen.bold(' Is Ready '));
        log('The directory structure is ' + chalk.yellow('Ready'));
        helper.endLine();
      }, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
      });
      break;
    case 'project':
      initProject(args).then((logs) => {
        log('The project has been ' + chalk.yellow('initialized'));
        helper.render(logs);
        helper.endLine();
      }, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
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

const initStructure = async (args) => {
  try {
    const base = 'src/';
    if (fs.pathExistsSync(base)) {
      throw {message : 'the ' + chalk.yellow('src') + ' directory already exists'};
    }

    // With redux?
    const option = helper.readOption(args, ['r', 'redux']);
    let withRedux = (option === null) ? (await inquirer.prompt(questions.REDUX))['redux'] : option;

    let paths = await Promise.all([
      makeDir(base + 'services'),
      makeDir(base + 'forms'),
      makeDir(base + 'environments'),
      makeDir(base + 'components'),
      makeDir(base + 'screens'),
      makeDir(base + 'models'),
      makeDir(base + 'navigation'),
      makeDir(base + 'helpers'),
      makeDir(base + 'themes'),
      makeDir(base + 'assets/styles'),
      makeDir(base + 'assets/html'),
      makeDir(base + 'assets/images'),
      makeDir(base + 'assets/sounds'),
    ]);

    let reduxPaths = [];
    if (withRedux) {
      reduxPaths = await Promise.all([
        makeDir(base + 'redux'),
        makeDir(base + 'redux/reducers'),
        makeDir(base + 'redux/actions'),
        makeDir(base + 'redux/types'),
      ]);
    }
    paths = paths.concat(reduxPaths);

    // Added .gitkeep
    const assetsPath = await helper.getRootPath(env) + 'src/assets/';
    for (let path of paths) {
      fs.copySync(assetsPath + 'files/gitkeep', path + '/.gitkeep');
    }

    // Added environment
    fs.copySync(assetsPath + 'files/environments/environment.ts', base + 'environments/environment.ts');
    fs.copySync(assetsPath + 'files/environments/index.js', base + 'environments/index.js');
  } catch (e) {
    throw new Error(e.message);
  }
};

const initProject = async (args) => {
  try {
    let logs = [];
    const rootPath = await helper.getRootPath(env) + 'src/';

    const pathResource = 'rn-rad.json';
    if (fs.pathExistsSync(pathResource)) {
      throw {message : chalk.yellow(pathResource) + ' already exists'};
    }

    fs.copySync(rootPath + 'assets/files/rn-rad.json',  'rn-rad.json');

    // With resoruces?
    const option = helper.readOption(args, ['r', 'resources']);
    let withResources = (option === null) ? (await inquirer.prompt(questions.PROJECT)).resources : option;

    if (withResources) {
      // Theme
      const pathTheme = 'src/themes/main';
      if (!fs.pathExistsSync(pathTheme)) {
        fs.copySync(rootPath + 'assets/files/themes/main',  pathTheme);
      } else {
        logs.push(chalk.yellow(pathTheme) + ' hasn\'t been copied because it exists');
      }

      const indexTheme = 'src/themes/index.js';
      if (!fs.pathExistsSync(indexTheme)) {
        fs.copySync(rootPath + 'assets/files/themes/index.js',  indexTheme);
      } else {
        logs.push(chalk.yellow(indexTheme) + ' directory hasn\'t been copied because it exists');
      }

      // Assets
      const assetsLogo = 'src/assets/images/logo.png';
      if (!fs.pathExistsSync(assetsLogo)) {
        fs.copySync(rootPath + 'assets/files/assets/images/logo.png',  assetsLogo);
        fs.copySync(rootPath + 'assets/files/assets/images/logo@2x.png',  'src/assets/images/logo@2x.png');
        fs.copySync(rootPath + 'assets/files/assets/images/logo@3x.png',  'src/assets/images/logo@3x.png');
      } else {
        logs.push(chalk.yellow(assetsLogo) + ' hasn\'t been copied because it exists');
      }

      const assetsFormStyle = 'src/assets/styles/form.js';
      if (!fs.pathExistsSync(assetsFormStyle)) {
        fs.copySync(rootPath + 'assets/files/assets/styles/form.js',  assetsFormStyle);
      } else {
        logs.push(chalk.yellow(assetsFormStyle) + ' hasn\'t been copied because it exists');
      }

      const assetsIndexStyle = 'src/assets/styles/index.js';
      if (!fs.pathExistsSync(assetsIndexStyle)) {
        fs.copySync(rootPath + 'assets/files/assets/styles/index.js',  assetsIndexStyle);
      } else {
        logs.push(chalk.yellow(assetsIndexStyle) + ' hasn\'t been copied because it exists');
      }
    }

    return logs;
  } catch (e) {
    throw new Error(e.message);
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
      fs.copySync(assetsPath + 'files/gitkeep', path + '/.gitkeep');
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
      await generate.generateFile(file, name, base);
    }

    return base;
  } catch (e) {
    throw new Error(e.message);
  }
};

const installPackages = async (args) => {
  try {

    // With redux?
    const option = helper.readOption(args, ['r', 'redux']);
    let withRedux = (option === null) ? (await inquirer.prompt(questions.REDUX))['redux'] : option;

    if (withRedux) {
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

  } catch (e) {
    throw new Error(e.message);
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
