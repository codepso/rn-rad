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
      theme(args).then((r) => {
        helper.render(r);
        helper.endLine();
      }, (e) => {
        log(helper.getError(e.message));
        helper.endLine();
      });
      break;
    case 'component':
      component(args).then((r) => {
        helper.render(r);
      }, (e) => {
        log(helper.getError(e));
        helper.endLine();
      });
      break;
    case 'screen':
      component(args, 'screen').then((r) => {
        helper.render(r);
      }, (e) => {
        log(helper.getError(e));
        helper.endLine();
      });
      break;
    case 'form':
      form(args).then((r) => {
        helper.render(r);
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

/**
 * Generate Theme
 * @param {string[]} args - Input args
 * @returns {string}
 */
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

    return 'Theme: ' + chalk.yellow(name) + ' has been created';
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Generate Component
 * @param {string[]} args - Input
 * @param {string} type - Type: component, screen
 * @param {Object} options - Options to generate the component.
 * @param {string} options.questions - Questions list.
 * @param {string} options.template - Template file.
 * @param {string} options.context - Template context.
 * @returns {string}
 */
const component = async (args, type = 'component', options = {}) => {
  try {
    const hasFeature = await helper.checkPkgAndFlag(['react-native-safe-area-view'], 'safeAreaView');
    const template = hasFeature ? 'component-safe-area.hbs' : 'component.hbs';
    const templatePath = _.has(options, 'template') ? options.template : 'templates/' + template;

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
    name = helper.clearSchematicName(name, 'screen');
    const suffix = type === 'screen' ? 'Screen' : '';
    const componentName = name + '' + suffix;

    const filePath = helper.getFilePath(path, componentName);
    if (fs.pathExistsSync(filePath)) {
      throw {message : chalk.yellow(filePath) + ' already exists'};
    }

    // Create template
    Handlebars.registerHelper('top:', function (text) {
      return "{{top: 'never'}}"
    });

    let context = {
      componentName,
      content: name
    };

    if (_.has(options, 'context')) {
      context = _.merge(context, options.context);
    }

    await generateFile(templatePath, filePath, context);

    // Response
    return chalk.yellow(componentName) + ' has been created';
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Generate Form
 * @param {string[]} args - Input args
 * @returns {string[]}
 */
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
    name = helper.clearSchematicName(name, 'form');
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

    let r = [];
    const context = {
      formName,
      schemaName,
      title: name + ' Form',
    };
    await generateFile(templatePath, filePath, context);
    r.push(chalk.yellow(formName) + ' has been created');

    if (view) {
      const options = prepareOptions(name, 'form');
      let t = await component([], 'screen', options);
      r = helper.mergeResults(r, t);
    }

    // Return name
    return r;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Prepare options.
 * @param {string} name - Schematic name.
 * @param {string} from - Prepare option from schematic.
 * @returns {Object}
 */
const prepareOptions = (name, from = '') => {
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

  const template = 'templates/forms/view.hbs';

  const context = {
    formName: name + 'Form'
  }

  const qView = _.merge(qMain, qUpdates);
  return { questions: qView, template, context };
};

const generateFile = async (templatePath, filePath, context) => {
  const assetsPath = await helper.getRootPath(env) + 'src/assets/';
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
