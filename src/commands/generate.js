"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const print = require('../utils/prints');
const helper = require('../utils/helper');
const Handlebars = require("handlebars");
const questions = require('../config/questions');
const fs = require('fs-extra');
const _ = require('lodash');

const log = console.log;
let env = 'prod';
const setEnv = (_env) => {
  env = _env;
};

const main = (option) => {
  const args = minimist(process.argv.slice(2));
  // Choice option
  switch (option) {
    case 'theme':
      theme(args).then((name) => {
        log('Theme: ' + chalk.yellow(name) + ' has been created');
        helper.endLine();
      }, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
      });
      break;
    case 'component':
      component(args).then((name) => {
        log('Component: ' + chalk.yellow(name) + ' has been created');
      }, (e) => {
        log(helper.getError(e));
        helper.endLine();
      });
      break;
    case 'screen':
      component(args, 'screen').then(() => {});
      break;
    default:
      print.main();
      break
  }
};

const theme = async (args) => {
  try {
    const themeName = helper.readArg(args, 'kc');
    const themePath = 'src/themes/' + themeName;

    if (fs.pathExistsSync(themePath)) {
      throw {message : chalk.yellow(themePath) + ' already exists'};
    }

    await fs.ensureDir(themePath);
    const assetsPath = await helper.getRootPath(env) + 'assets/';

    const themeLocal = 'src/themes/main/index.js';
    if (!fs.pathExistsSync(themeLocal)) {
      fs.copySync(assetsPath + 'files/themes/main/index.js', themePath + '/index.js');
    } else {
      fs.copySync(themeLocal, themePath + '/index.js');
    }

    return themePath;
  } catch (e) {
    throw new Error(e.message);
  }
};

const component = async (args, type = 'component') => {
  try {
    const hasFeature = await helper.checkPkgAndFlag(['react-native-safe-area-view'], 'safeAreaView');
    const tmp = hasFeature ? 'component-safe-area.hbs' : 'component.hbs';
    let q =  (type === 'component') ? questions.COMPONENT: questions.SCREEN;

    let path = helper.readOption(args, ['p', 'path'], 'string');
    if (!_.isNull(path)) {
      _.unset(q, 'path');
    }

    let name = helper.readArg(args);
    if (!_.isNull(name)) {
      _.unset(q, 'name');
    }

    // Questions
    const answers = await inquirer.prompt(_.values(q));
    if (_.has(answers, 'name')) {
      name = answers['name'];
    }

    if (_.has(answers, 'path')) {
      path = answers['path'];
    }

    path = helper.currentPath(path);
    name = type === 'screen'? name + 'Screen' : name;
    await template(tmp, name, path);

    return name
  } catch (e) {
    throw new Error(e);
  }
};

const template = async (file, name, path) => {
  Handlebars.registerHelper('top:', function (text) {
    return "{{top: 'never'}}"
  });

  const content = name.replace('Screen', '');
  const assetsPath = await helper.getRootPath(env) + 'assets/';
  const source = await helper.readTemplate(assetsPath + 'templates/' + file);
  const template = Handlebars.compile(source);
  const compiled =  template({ name, content });
  const pathFile = helper.getPathFile(path, name);
  await helper.writeTemplate(pathFile, compiled);
};

module.exports = {
  main,
  setEnv,
  template
};
