"use strict";

const minimist = require('minimist');
const chalk = require('chalk');
const help = require('./help');
const generate = require('./generate');

const log = console.log;

const printAuthors = () => {
  log(chalk.white('Authors: '));
  log(chalk.white('- Juan Minaya Leon ' + chalk.yellow('<minayaleon@gmail.com>')));
};

const printWelcome = () => {
  help.printLogo();
  log(chalk.white('usage: ') + chalk.white('react-init ' ) + chalk.yellow('[command] <options>'));
  log('');
  log('Available Commands:');
  log(chalk.yellow('- generate (g)') +  chalk.white(' Generates and/or modifies files based on a schematic.'));
  log(chalk.yellow('- help (h)') +  chalk.white(' Lists available commands and their short descriptions.'));
  log(chalk.yellow('- Who (w)') +  chalk.white(' Lists authors'));
  log(chalk.yellow('- version (v)') +  chalk.white(' Lists authors'));
};

const init = (env) => {

  generate.setEnv(env);

  const args = minimist(process.argv.slice(2));
  let cmd = null;
  if (args._[0]) {
    cmd = args._[0];
  }

  switch (cmd) {
    case 'generate':
    case 'g':
      const option = args._[1];
      generate.init(option);
      break;
    case 'help':
    case 'h':
      printWelcome();
      break;
    case 'who':
    case 'w':
      help.printLogo();
      printAuthors();
      break;
    case 'version':
    case 'v':
      help.printVersion();
      break;
    default:
      help.printDefault();
      break;
  }
};

module.exports = {
  init
};
