"use strict";

const minimist = require('minimist');
const prints = require('./utils/prints');
const generate = require('./commands/generate');
const architecture = require('./commands/architecture');
const helper = require('./utils/helper');
const log = console.log;

const main = (env) => {

  generate.setEnv(env);
  prints.setEnv(env);
  architecture.setEnv(env);

  const args = minimist(process.argv.slice(2));
  let cmd = null;
  if (args._[0]) {
    cmd = args._[0];
  }

  try {
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
        prints.help();
        helper.endLine();
        break;
      case 'who':
      case 'w':
        prints.authors();
        helper.endLine();
        break;
      case 'version':
      case 'v':
        prints.version().then(() => {
          helper.endLine();
        });
        break;
      case 'check':
        // const pkgs = new Map([['react-native', '0.61.1'], ['react', '16.9.0']]);
        const pkgs = ['react-native', 'react'];
        helper.checkPackage(pkgs).then(() => {
          log('We\'re ready to work :)');
          helper.endLine();
        }, (e) => {
          log(helper.getError(e));
          helper.endLine();
        });
        break;
      default:
        prints.main();
        helper.endLine();
        break;
    }

  } catch (e) {
    log(helper.getError(e.message));
    helper.endLine();
  }
};

module.exports = {
  main
};
