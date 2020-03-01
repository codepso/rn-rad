const _ = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const readPackageJson = require('@pnpm/read-package-json');
const validator = require('validator');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const accessDir = promisify(fs.access);

const getError = (error, resource = '') => {
  let message = 'There was an unknown error';
  if (_.has(error, 'message')) {
    message = error.message;
  }
  if (_.has(error, 'code')) {
    console.log(error);
    switch (error.code) {
      case 'ENOENT':
        message = 'There was an error reading/writing the ' + chalk.yellow(resource);
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

const checkDirectory = async (dir) => {
  try {
    await accessDir(dir);
    return true;
  } catch (error) {
    return false;
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

const writeTemplate = async (path, content) => {
  try {
    await writeFile(path, content);
  } catch (error) {
    let message = getError(error, path);
    throw {message};
  }
};

const checkCurrentPath = (path) => {
  return (path === '.') ? '' : path
};

const getPathFile = (path, name) => {
  return (path !== '') ? path + '/' + name + '.js' : name + '.js';
};

const validate = (val, type) => {
  switch (type) {
    case 'alpha':
      if (!validator.isAlpha(val)) {
        return 'The component name must be only letters ' + chalk.yellow('(a-zA-Z)');
      }
      break;
    case 'number':
      break;
  }

  return true;
};

module.exports = {
  getError,
  readTemplate,
  writeTemplate,
  checkPackage,
  validate,
  checkCurrentPath,
  getPathFile,
  checkDirectory
};
