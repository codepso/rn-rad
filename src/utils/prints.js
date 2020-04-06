"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const log = console.log;

const logo = () => {
  log(chalk.blue(figlet.textSync('rn-rad', { horizontalLayout: 'full' })));
  log('React Native with Rapid Application Development');
};

const version = () => {
  log(chalk.white('Version ') + chalk.yellow('1.0.16'));
  log('');
};

const help = () => {
  log('');
  log(chalk.white('You can use ') + chalk.yellow('help') + chalk.white(' command'));
  log('');
  // log(chalk.white('Do you need more help? write me -> ') +  chalk.yellow('minayaleon@gmail.com :)'));
};

const authors = () => {
  log(chalk.white('Authors: '));
  log(chalk.white('- Juan Minaya Leon ' + chalk.yellow('<minayaleon@gmail.com>')));
};

const welcome = () => {
  logo();
  log('rn-rad ' + chalk.yellow('[command] <options>'));
  log('');
  log('Available Commands:');
  log('');
  log(chalk.yellow('Architecture (i)'));
  log(chalk.yellow(' - i packages [redux=true]'));
  log(chalk.yellow(' - i project [redux=true]') + chalk.white(' (working on it)'));
  log(chalk.yellow(' - i auth') + chalk.white(' (working on it)'));
  log(chalk.yellow('Generators (g)') +  chalk.white(' '));
  log(chalk.yellow(' - g structure [redux=true]'));
  log(chalk.yellow(' - g component [name] [path]'));
  log(chalk.yellow(' - g screen [name] [path]'));
  // log(chalk.yellow('- help (h)') +  chalk.white(' Lists available commands and their short descriptions.'));
  log(chalk.yellow('About'));
  log(chalk.yellow(' - who (w)') +  chalk.white(' authors'));
  log(chalk.yellow(' - version (v)'));
  log('');
};

module.exports = {
  logo,
  help,
  version,
  authors,
  welcome
};
