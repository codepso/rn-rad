"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const log = console.log;

const printLogo = () => {
  log(chalk.blue(figlet.textSync('React Native Rad', { horizontalLayout: 'full' })));
  log('');
};

const printVersion = () => {
  log(chalk.white('Version ') + chalk.yellow('1.0.7'));
  log('');
};

const printDefault = () => {
  // printLogo();
  log('');
  log(chalk.white('You can use ') + chalk.yellow('help') + chalk.white(' command'));
  log('');
  log(chalk.white('Do you need more help? write me -> ') +  chalk.yellow('minayaleon@gmail.com :)'));
};

module.exports = {
  printLogo,
  printDefault,
  printVersion
};
