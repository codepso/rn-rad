"use strict";

const chalk = require('chalk');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const help = require('./help');
const fs = require('fs');

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

const getAssetsPath = async () => {

  const util = require('util');
  const exec = util.promisify(require('child_process').exec);

  // Get npm global path
  const { stdout, stderr } = await exec('npm root -g');
  const globalPath = stdout.replace(/\n$/, '') + '/@codepso/rn-rad/assets/'

  return (env === 'prod') ? globalPath : 'assets/';
}

const structure = async () => {

  const assetsPath = await getAssetsPath()

  const base = (env === 'prod') ? 'src/' : 'test/src/';

  const paths = await Promise.all([
    makeDir(base + 'services'),
    makeDir(base + 'forms'),
    makeDir(base + 'environments'),
    makeDir(base + 'components'),
    makeDir(base + 'screens'),
    makeDir(base + 'redux'),
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
    fs.copyFileSync('assets/files/gitkeep', path + '/.gitkeep');
  }

  // Added environment
  fs.copyFileSync(assetsPath + 'files/environments/environment.ts', base + 'environments/environment.ts');
  fs.copyFileSync(assetsPath + 'files/environments/index.js', base + 'environments/index.js');
  log(chalk.white('The directory structure is ready '))

  // log(chalk.white('The directory structure: ') + chalk.white.bgGreen.bold(' Is Ready '));

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
};

module.exports = {
  init,
  setEnv
};