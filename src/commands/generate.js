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
      component(args, 'screen').then((name) => {
        log('Component: ' + chalk.yellow(name) + ' has been created');
      }, (e) => {
        log(helper.getError(e));
        helper.endLine();
      });
      break;
    case 'form':
      form(args).then((name) => {
        log('Form: ' + chalk.yellow(name) + ' has been created');
      }, (e) => {
        log(helper.getError(e));
        helper.endLine();
      });
      break;
    default:
      print.main();
      break
  }
};

const theme = async (args) => {
  try {
    let q =  questions.THEME;

    let name = helper.readArg(args, 'kc');
    if (!_.isNull(name)) {
      _.unset(q, 'name');
    }

    // Questions
    const answers = await inquirer.prompt(_.values(q));
    if (_.has(answers, 'name')) {
      name = answers['name'];
    }

    const themePath = 'src/themes/' + name;
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
    throw new Error(e);
  }
};

const component = async (args, type = 'component', options = {}) => {
  try {
    const hasFeature = await helper.checkPkgAndFlag(['react-native-safe-area-view'], 'safeAreaView');
    const template = hasFeature ? 'component-safe-area.hbs' : 'component.hbs';

    let q =  (type === 'component') ? questions.COMPONENT: questions.SCREEN;
    q = _.has(options, 'questions') ? options.questions : q;

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
    const suffix = type === 'screen' ? 'Screen' : '';
    const templatePath = 'templates/' + template;
    const componentName = name + '' + suffix;

    const filePath = helper.getFilePath(path, componentName);
    if (fs.pathExistsSync(filePath)) {
      throw {message : chalk.yellow(filePath) + ' already exists'};
    }

    // Create template
    Handlebars.registerHelper('top:', function (text) {
      return "{{top: 'never'}}"
    });

    const context = {
      componentName,
      content: name
    };
    await generateFile(templatePath, filePath, context);

    // Return name
    return componentName;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const form = async (args) => {
  try {
    await helper.checkPackage(['@codepso/rn-helper']);
    let q =  questions.FORM;

    let path = helper.readOption(args, ['p', 'path'], 'string');
    if (!_.isNull(path)) {
      _.unset(q, 'path');
    }

    let view = helper.readOption(args, ['v', 'view']);
    if (!_.isNull(view)) {
      _.unset(q, 'view');
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

    if (_.has(answers, 'view')) {
      view = answers['view'];
    }

    path = helper.currentPath(path);
    const formName = name + 'Form';
    const schemaName = name + 'Schema';
    const templatePath = 'templates/forms/form.hbs';

    const filePath = helper.getFilePath(path, formName);
    if (fs.pathExistsSync(filePath)) {
      throw {message : chalk.yellow(filePath) + ' already exists'};
    }

    // Create template
    Handlebars.registerHelper('name:', function (text) {
      return "{{name: ''}}"
    });

    Handlebars.registerHelper('schema', function (text) {
      return '{{' + schemaName + '}}';
    });

    const context = {
      formName,
      schemaName,
      title: name + ' Form',
    };
    // await generateFile(templatePath, filePath, context);

    if (view) {
      const options = prepareView(name, 'form');
      await component([], 'screen', options);
    }

    // Return name
    return formName;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const prepareView = (name, from = 'form') => {
  let qMain = questions.SCREEN;
  delete qMain.name.validate;
  const qUpdates = {
    name: {
      message: 'What will be the name (view)',
      default: name + 'Screen'
    },
    path: {
      message: 'Where will it be saved (view)',
    }
  }

  const qView = _.merge(qMain, qUpdates);
  return { questions: qView }
};

const generateFile = async (templatePath, filePath, context) => {
  const assetsPath = await helper.getRootPath(env) + 'assets/';
  const source = await helper.readTemplate(assetsPath + templatePath);
  const template = Handlebars.compile(source);
  const compiled =  template(context);
  await helper.writeTemplate(filePath, compiled);
};

module.exports = {
  main,
  setEnv,
  generateFile
};
