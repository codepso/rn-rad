"use strict";

const minimist = require('minimist');
const print = require('./utils/prints');
const generate = require('./commands/generate');
const architecture = require('./commands/architecture');

const main = (env) => {

  generate.setEnv(env);

  const args = minimist(process.argv.slice(2));
  let cmd = null;
  if (args._[0]) {
    cmd = args._[0];
  }

  const option = args._[1];

  switch (cmd) {
    case 'i':
      architecture.main(option);
      break;
    case 'generate':
    case 'g':
      generate.main(option);
      break;
    case 'help':
    case 'h':
      print.welcome();
      break;
    case 'who':
    case 'w':
      print.authors();
      break;
    case 'version':
    case 'v':
      print.version();
      break;
    default:
      print.help();
      break;
  }
};

module.exports = {
  main
};
