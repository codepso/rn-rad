const _ = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const readPackageJson = require('@pnpm/read-package-json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.readFile);

const getError = (error, resource = '') => {
  let message = 'There was an unknown error';
  if (_.has(error, 'message')) {
    message = error.message;
  }
  if (_.has(error, 'code')) {
    switch (error.code) {
      case 'ENOENT':
        message = 'There was an error reading the ' + chalk.yellow(resource);
        break;
      case 'REACT_NATIVE':
        message = 'It must be a ' + chalk.yellow('React Native') + ' project';
        break;
    }
  }
  return message;
};

const checkPackage = async (package = '') => {
  const path = 'package.json';
  try {
    const pkgJson = await readPackageJson.default(path);
    if (!_.has(pkgJson['dependencies'], 'react') || !_.has(pkgJson['dependencies'], 'react-native')) {
      throw {code: 'REACT_NATIVE'};
    }
    return !(package !== '' && !_.has(pkgJson['dependencies'], package));

  } catch (error) {
    let message = getError(error, path);
    throw {message};
  }
};

const readTemplate = async (path) => {
  try {
    const data = await readFile(path);
    return data.toString();
  } catch (error) {
    let message = getError(error, path);
    throw {message};
  }
};

const writeTemplate = async (path) => {
  try {
    const data = await writeFile(path);
    return data.toString();
  } catch (error) {
    let message = getError(error, path);
    throw {message};
  }
};

module.exports = {
  getError,
  readTemplate,
  writeTemplate,
  checkPackage
};
