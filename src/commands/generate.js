"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const print = require('../utils/prints');
const fs = require('fs');
const _ = require('lodash');
const helper = require('../utils/helper');
const Handlebars = require("handlebars");
const questions = require('../config/questions');

const log = console.log;
let env = 'prod';

const setEnv = (_env) => {
  env = _env;
};

const main = (option) => {
  const args = minimist(process.argv.slice(2));
  // Choice option
  switch (option) {
    case 'init':
      init().then(() => {});
      break;
    case 'structure':
      structure().then(() => {
        //log(chalk.white('The directory structure: ') + chalk.black.bgGreen.bold(' Is Ready '));
        log('The directory structure is ' + chalk.yellow('Ready'));
      });
      break;
    case 'component':
      component(args).then(() => {});
      break;
    case 'screen':
      component(args, 'screen').then(() => {});
      break;
    case 'help':
      print.logo();
      log(chalk.white('Generates and/or modifies files based on a schematic.'));
      log(chalk.white('usage: ') + chalk.white('rn-rad generate ' ) + chalk.yellow('<schematic> <options>'));
      log('');
      log('Arguments:');
      log(chalk.yellow('- schematic: ') + chalk.white('The schematic or collection:schematic to generate. ' ));
      log('');
      log('Options:');
      log(chalk.yellow('- name: ') + chalk.white('The component name in CamelCase ' ));
      log(chalk.gray('  Only available for component schematic'));
      log('');
      log('Schematics:');
      log('- structure');
      log('- component');
      break;
    default:
      print.help();
      break
  }
};

const init = async (args) => {
  try {

  } catch (error) {
    log(helper.getError(error));
  }
};

const component = async (args, type = 'component') => {
  try {
    const isSafeAreaView = await helper.checkPackage('react-native-safe-area-view');
    let file = 'component.hbs';
    if (isSafeAreaView) {
      file = 'component-safe-area.hbs';
    }

    const temp = args._;
    const params = temp.slice(2);
    let name;
    let path;
    const q =  (type === 'component') ? questions.COMPONENT: questions.SCREEN;

    if (params.length === 0) {
      const answers = await inquirer.prompt(q);
      name = answers.name;
      path = helper.checkCurrentPath(answers.path);
    } else {
      name = params[0];
      if (!params[1]) {
        const answers = await inquirer.prompt(q.pop());
        path = helper.checkCurrentPath(answers.path);
      } else {
        path = helper.checkCurrentPath(params[1]);
      }
    }

    name = type === 'screen'? name + 'Screen' : name;

    await template(file, name, path);
  } catch (error) {
    log(helper.getError(error));
  }
};

const template = async (file, name, path) => {
  Handlebars.registerHelper('top:', function (text) {
    return "{{top: 'never'}}"
  });

  const content = name.replace('Screen', '');
  const assetsPath = await helper.getAssetsPath(env);
  const source = await helper.readTemplate(assetsPath + 'templates/' + file);
  const template = Handlebars.compile(source);
  const compiled =  template({ name, content });
  const pathFile = helper.getPathFile(path, name);
  await helper.writeTemplate(pathFile, compiled);
};

const structure = async () => {
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

    const assetsPath = await helper.getAssetsPath(env);
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

module.exports = {
  main,
  setEnv,
  template
};
