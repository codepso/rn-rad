"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const print = require('../utils/prints');
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
    case 'theme':
      theme(args).then((name) => {
        log('Theme' + chalk.yellow(name) + ' has been created');
      });
      break;
    case 'component':
      component(args).then(() => {});
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
    const temp = args._;
    const params = temp.slice(2);
    console.log(params);
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
