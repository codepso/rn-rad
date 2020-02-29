"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const help = require('./help');
const fs = require('fs');
const _ = require('lodash');
const helper = require('./helper');
const Handlebars = require("handlebars");
const validator = require('validator');

const log = console.log;
let env = 'prod';

const setEnv = (_env) => {
  env = _env;
};

const test = () => {
  console.log(env);
};

const init = (option) => {
  const args = minimist(process.argv.slice(2));
  // Choice option
  switch (option) {
    case 'structure':
      structure().then(() => {});
      break;
    case 'component':
      component(args).then(() => {});
      break;
    case 'help':
      help.printLogo();
      log(chalk.white('Generates and/or modifies files based on a schematic.'));
      log(chalk.white('usage: ') + chalk.white('react-init generate ' ) + chalk.yellow('<schematic> <options>'));
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
      help.printDefault();
      break
  }
};

const getAssetsPath = async () => {

  const util = require('util');
  const exec = util.promisify(require('child_process').exec);

  // Get npm global path
  const { stdout, stderr } = await exec('npm root -g');
  const globalPath = stdout.replace(/\n$/, '') + '/@codepso/rn-rad/assets/';

  return (env === 'prod') ? globalPath : '../assets/';
};

const component = async (args) => {
  try {
    const isSafeAreaView = await helper.checkPackage('react-native-safe-area-view');
    let file = 'component.hbs';
    if (isSafeAreaView) {
      file = 'component-safe-area.hbs';
    }

    const temp = args._;
    const params = temp.slice(2);
    let name = '';
    let path = 'src/components';

    const questions = [
      {
        type : 'input',
        name : 'name',
        message : 'What will be the name?',
        validate : async (input) => {
          return helper.validate(input, 'alpha');
        }
      },
      {
        type : 'input',
        name : 'path',
        message : 'Where will it be saved?',
        default: path
      }
    ];

    if (params.length === 0) {
      const answers = await inquirer.prompt(questions);
      name = answers.name;
      path = helper.checkCurrentPath(answers.path);
    } else {
      name = params[0];
      if (!params[1]) {
        const answers = await inquirer.prompt(questions.pop());
        path = helper.checkCurrentPath(answers.path);
      } else {
        path = helper.checkCurrentPath(params[1]);
      }
    }

    await template(file, name, path);
  } catch (error) {
    log(helper.getError(error));
  }
};

const template = async (file, name, path) => {
  Handlebars.registerHelper('top:', function (text) {
    return "{{top: 'never'}}"
  });

  const source = await helper.readTemplate('../assets/templates/' + file);
  const template = Handlebars.compile(source);
  const compiled =  template({ name });
  const pathFile = helper.getPathFile(path, name);
  await helper.writeTemplate(pathFile, compiled);
};

const structure = async () => {
  try {
    // Check if have package.json and if it is react native project
    await helper.checkPackage();

    const assetsPath = await getAssetsPath();
    const base = 'src/';
    const paths = await Promise.all([
      makeDir(base + 'services'),
      makeDir(base + 'forms'),
      makeDir(base + 'environments'),
      makeDir(base + 'components'),
      makeDir(base + 'screens'),
      makeDir(base + 'redux'),
      makeDir(base + 'models'),
      makeDir(base + 'redux/reducers'),
      makeDir(base + 'redux/actions'),
      makeDir(base + 'redux/types'),
      makeDir(base + 'navigation'),
      makeDir(base + 'helpers'),
      makeDir(base + 'theme'),
      makeDir(base + 'assets/styles'),
      makeDir(base + 'assets/html'),
      makeDir(base + 'assets/images'),
      makeDir(base + 'assets/sounds'),
    ]);

    // Added .gitkeep
    for (let path of paths) {
      fs.copyFileSync(assetsPath + 'files/gitkeep', path + '/.gitkeep');
    }

    // Added environment
    fs.copyFileSync(assetsPath + 'files/environments/environment.ts', base + 'environments/environment.ts');
    fs.copyFileSync(assetsPath + 'files/environments/index.js', base + 'environments/index.js');
    //log(chalk.white('The directory structure is ready'));

    log(chalk.white('The directory structure: ') + chalk.black.bgGreen.bold(' Is Ready '));

    /*
  const questions = [
    {
      type : 'confirm',
      name : 'isRedux',
      message : 'Do you want to add redux?'
    }
  ];

  /*inquirer
    .prompt(questions)
    .then(answers => {
      if (answers.isRedux) {
        console.log('Enter');
        // log(chalk.white('Installing ') + chalk.white('react-navigation...'));
      }
    });*/
  } catch (error) {
    log(helper.getError(error));
  }
};

module.exports = {
  init,
  setEnv
};
