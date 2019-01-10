"use strict";

const chalk = require('chalk');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const help = require('./help');

const log = console.log;
let env = 'prod';

const setEnv = (_env) => {
  env = _env;
};

const test = () => {
  console.log(env);
};

const init = (option) => {
  // Choice option
  switch (option) {
    case 'structure':
      structure();
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

const structure = () => {

  const base = (env === 'prod') ? 'src/' : 'test/src/';
  const questions = [
    {
      type : 'confirm',
      name : 'isReactNavigation',
      message : 'Do you want use React Navigation? '
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      Promise.all([
        makeDir(base + 'config/env'),
        makeDir(base + 'config/locale'),
        makeDir(base + 'components'),
        makeDir(base + 'screens'),
        makeDir(base + 'redux'),
        makeDir(base + 'redux/reducers'),
        makeDir(base + 'redux/actions'),
        makeDir(base + 'redux/types'),
        makeDir(base + 'navigation'),
        makeDir(base + 'forms'),
        makeDir(base + 'helpers'),
        makeDir(base + 'theme'),
        makeDir(base + 'assets/styles'),
        makeDir(base + 'assets/html'),
        makeDir(base + 'assets/images'),
        makeDir(base + 'assets/sounds'),
      ]).then(paths => {

        log(chalk.white('The directory structure: ') + chalk.white.bgGreen.bold(' Is Ready '));
        if (answers.isReactNavigation) {
          // log(chalk.white('Installing ') + chalk.white('react-navigation...'));
        }
      });
    });
};

module.exports = {
  init,
  setEnv
};