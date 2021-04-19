"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const helper = require('../utils/helper');
const log = console.log;

// Environment
let env = 'prod';
const setEnv = (_env) => {
  env = _env;
};

const logo = () => {
  log(chalk.blue(figlet.textSync('rn-rad', { horizontalLayout: 'full' })));
  log('React Native with Rapid Application Development');
};

const version = async () => {
  const version = await helper.getVersion(env);
  log(chalk.white('Version ') + chalk.yellow(version));
};

const main = () => {
  log(chalk.white('You can use ') + chalk.yellow('help') + chalk.white(' command'));
  log('');
  // log(chalk.white('Do you need more help? write me -> ') +  chalk.yellow('minayaleon@gmail.com :)'));
};

const authors = () => {
  log(chalk.white('Authors: '));
  log(chalk.white('- Juan Minaya Leon ' + chalk.yellow('<minayaleon@gmail.com>')));
};

const help = () => {
  logo();
  log('rn-rad ' + chalk.yellow('[command] <options>'));
  log('');
  log('Available Commands:');
  log('');
  log(chalk.yellow('Initializers (i)'));
  log(chalk.yellow(' - i config'));
  log(chalk.yellow(' - i packages [redux=true]'));
  log(chalk.yellow(' - i structure [redux=true]'));
  log(chalk.yellow(' - i project [redux=true]'));
  log(chalk.yellow(' - i auth') + chalk.white(' (working on it)'));
  log(chalk.yellow('Generators (g)') +  chalk.white(' '));
  log(chalk.yellow(' - g component [name] [path]'));
  log(chalk.yellow(' - g screen [name] [path]'));
  log(chalk.yellow(' - g theme [name]'));
  log(chalk.yellow(' - g form [name]'));
  // log(chalk.yellow('- help (h)') +  chalk.white(' Lists available commands and their short descriptions.'));
  log(chalk.yellow('About'));
  log(chalk.yellow(' - who (w)') +  chalk.white(' authors'));
  log(chalk.yellow(' - version (v)'));
};

module.exports = {
  logo,
  help,
  version,
  authors,
  main,
  setEnv,
};
