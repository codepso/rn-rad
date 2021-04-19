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
    case 'config':
      initConfig().then((logs) => {
        log('The rn-rad.json has been ' + chalk.yellow('created'));
        helper.render(logs);
        helper.endLine();
      }, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
      });
      break;
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
    const option1 = helper.readOption(args, ['r', 'redux']);
    let withRedux = (option1 === null) ? (await inquirer.prompt(questions.REDUX))['redux'] : option1;

    // With lang?
    const option2 = helper.readOption(args, ['l', 'lang']);
    let withLang = (option2 === null) ? (await inquirer.prompt(questions.LANG))['lang'] : option2;

    let paths = await Promise.all([
      makeDir(base + 'app/context'),
      makeDir(base + 'app/reducers'),
      makeDir(base + 'services'),
      makeDir(base + 'forms'),
      makeDir(base + 'environments'),
      makeDir(base + 'components'),
      makeDir(base + 'screens'),
      makeDir(base + 'models'),
      makeDir(base + 'navigator'),
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

    let langPaths = [];
    if (withLang) {
      langPaths = await Promise.all([
        makeDir(base + 'i18n'),
        makeDir(base + 'i18n/langs'),
      ]);
    }
    paths = paths.concat(langPaths);

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

const initConfig = async () => {
  let logs = [];
  try {
    const rootPath = await helper.getRootPath(env) + 'src/';
    const pathResource = 'rn-rad.json';
    if (fs.pathExistsSync(pathResource)) {
      logs.push(chalk.yellow(pathResource) + ' already exists');
    } else {
      fs.copySync(rootPath + 'assets/files/rn-rad.json',  'rn-rad.json');
    }

    return logs;
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
      // throw {message : chalk.yellow(pathResource) + ' already exists'};
      logs.push(chalk.yellow(pathResource) + ' already exists');
    } else {
      fs.copySync(rootPath + 'assets/files/rn-rad.json',  'rn-rad.json');
    }

    // With resoruces?
    const option = helper.readOption(args, ['r', 'resources']);
    let withResources = (option === null) ? (await inquirer.prompt(questions.PROJECT)).resources : option;

    if (withResources) {
      let tempLogs = [];

      // Theme
      const theme = require('./architecture/init/theme');
      tempLogs = await theme.init(rootPath);
      logs = logs.concat(tempLogs);

      // Images
      const images = require('./architecture/init/images');
      tempLogs = await images.init(rootPath);
      logs = logs.concat(tempLogs);

      // Styles
      const styles = require('./architecture/init/styles');
      tempLogs = await styles.init(rootPath);
      logs = logs.concat(tempLogs);

      // App
      const app = require('./architecture/init/app');
      tempLogs = await app.init(rootPath);
      logs = logs.concat(tempLogs);

      // Forms
      const forms = require('./architecture/init/forms');
      tempLogs = await forms.init(rootPath);
      logs = logs.concat(tempLogs);

      // Navigator
      const navigator = require('./architecture/init/navigator');
      tempLogs = await navigator.init(rootPath);
      logs = logs.concat(tempLogs);

      // Redux
      const redux = require('./architecture/init/redux');
      tempLogs = await redux.init(rootPath);
      logs = logs.concat(tempLogs);

      // Screens
      const screens = require('./architecture/init/screens');
      tempLogs = await screens.init(rootPath);
      logs = logs.concat(tempLogs);

      // Main
      const main = require('./architecture/init/main');
      tempLogs = await main.init(rootPath);
      logs = logs.concat(tempLogs);
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
    const optionR = helper.readOption(args, ['r', 'redux']);
    let withRedux = (optionR === null) ? (await inquirer.prompt(questions.REDUX))['redux'] : optionR;

    if (withRedux) {
      dependencies = dependencies.concat(packages.REDUX);
    }

    // With lang?
    const optionL = helper.readOption(args, ['l', 'lang']);
    let withLang = (optionL === null) ? (await inquirer.prompt(questions.LANG))['lang'] : optionL;

    if (withLang) {
      dependencies = dependencies.concat(packages.LANG);
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
