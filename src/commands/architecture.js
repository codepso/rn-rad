"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('../config/questions');
const helper = require('../utils/helper');
const packages = require('../config/packages');
const { spawn } = require('child_process');

const log = console.log;
let env = 'prod';
let dependencies = packages.MAIN;

const setEnv = (_env) => {
  env = _env;
};

const main = (option) => {
  const args = minimist(process.argv.slice(2));
  switch (option) {
    case 'packages':
      installPackages().then(() => {});
      break;
    case 'project':
      log('We\'re working on it');
      break;
    case 'auth':
      log('We\'re working on it');
      break;
  }
};

const installPackages = async () => {
  try {
    const answers = await inquirer.prompt(questions.REDUX);
    if (answers.redux) {
      dependencies = dependencies.concat(packages.REDUX);
    }

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
      log('');
      log('The following packages have been ' + chalk.yellow('installed') + ':');
      log('');
      dependencies.forEach(element => log('- ' + element));
      log('');
      log(chalk.yellow('Done!'));
    });

  } catch (error) {
    log(helper.getError(error));
  }
};

module.exports = {
  main,
  setEnv
};
