"use strict";

const minimist = require('minimist');
const prints = require('./utils/prints');
const generate = require('./commands/generate');
const architecture = require('./commands/architecture');

const main = (env) => {

  generate.setEnv(env);
  prints.setEnv(env);
  architecture.setEnv(env);

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
      prints.welcome();
      break;
    case 'who':
    case 'w':
      prints.authors();
      break;
    case 'version':
    case 'v':
      prints.version().then(() => {});
      break;
    default:
      prints.help();
      break;
  }
};

module.exports = {
  main
};
