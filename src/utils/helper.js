const _ = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const readPackageJson = require('@pnpm/read-package-json');
const validator = require('validator');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const accessDir = promisify(fs.access);
const accessResource = promisify(fs.access);

const getError = (error, resource = '') => {
  let message = 'There was an unknown error';
  if (typeof error === 'string') {
    message = error;
  }
  if (_.has(error, 'message')) {
    message = error.message;
  }
  if (_.has(error, 'code')) {
    switch (error.code) {
      case 'ENOENT':
        message = 'There was an error reading/writing the ' + chalk.yellow(resource);
        break;
      case 'REACT_NATIVE':
        message = 'It must be a ' + chalk.yellow('React Native') + ' project';
        break;
    }
  }
  return chalk.red('E -> ') +  message;
};

const readOption = (args, keys, type = 'bool') => {
  let value = null;
  for (let i = 0; i < keys.length; i++) {
    if (_.has(args, keys[i])) {
      value = convertTo(args[keys[i]], type);
      break;
    }
  }
  return value;
};

const readArg = (args, type = 'ucc') => {
  const arg = ((args['_'].slice(2))[0]);
  return _.isNil(arg) ? null : (type !== 'ucc' ? arg.toLowerCase() : arg);
};

const convertTo = (value, to) => {
  let converted = value;
  switch (to) {
    case 'bool':
      converted = (value === true || value === 'true' || value === '1' || value === 1);
      break;
    case 'string':
      converted = (typeof value !== 'string') ? '' : value;
      break;
  }

  return converted;
};

const getVersion = async (env) => {
  try {
    const rootPath = await getRootPath(env);
    const path = rootPath + 'package.json';
    const pkgJson = await readPackageJson.default(path);
    if (!_.has(pkgJson, 'version')) {
      throw {code: 'PACKAGE_READ'};
    }
    return pkgJson['version'];
  } catch (error) {
    let message = getError(error, path);
    throw {message};
  }
};

const checkPackage = async (pkgs) => {
  try {
    const hasVersions = (pkgs instanceof Map);
    const keys = hasVersions ? Array.from(pkgs.keys()) : pkgs;
    const pkgJson = await readPackageJson.default('package.json');
    const r = _.pick(pkgJson['dependencies'], keys);

    keys.forEach(key => {
      if (!_.has(r, key)) {
        throw {message: 'Package ' + chalk.yellow(key) + ' not found'};
      }
    });

    if (hasVersions) {
      keys.forEach(key => {
        const vA = pkgs.get(key);
        if (!isHigherVersion(vA, pkgJson['dependencies'][key])) {
          throw {message: 'Package ' + chalk.yellow(key) + ' must be ' + chalk.yellow(vA) + ' or geather'};
        }
      });
    }

    return true;
  } catch (e) {
    throw e;
  }
};

const isHigherVersion = (a, b) => {
  const lA = a.split('.'), lB = b.split('.');
  for (let i = 0; i < lA.length; i ++) {
    const vA = parseInt(lA[i]), vB = parseInt(lB[i]);
    if (vA > vB) {
      return false
    }
  }
  return true;
};

const checkPkgAndFlag = async (pkgs, feature) => {
  const hasPackage = await checkPackage(pkgs);
  const hasFeatureActive = await checkFlag(feature);
  return hasPackage && hasFeatureActive;
};

const checkFlag = async (feature) => {
  const config = await readPackageJson.default('rn-rad.json');
  if (_.has(config, feature)) {
    return config[feature];
  }
  return true;
};

const checkDirectory = async (dir) => {
  try {
    await accessDir(dir);
    return true;
  } catch (error) {
    return false;
  }
};

const checkResource = async (resource) => {
  try {
    await accessResource(resource);
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

const getRootPath = async (env) => {

  const util = require('util');
  const exec = util.promisify(require('child_process').exec);

  // Get npm global path
  const { stdout, stderr } = await exec('npm root -g');
  const globalPath = stdout.replace(/\n$/, '') + '/@codepso/rn-rad/';

  return (env === 'prod') ? globalPath : getLocalPath(env);
};

const currentPath = (path) => {
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

const getLocalPath = (env) => {
  let local = '';
  switch (env) {
    case 'dev':
    case 'test':
      local = '../';
      break;
    case 'stage':
      local = '../../';
      break;
  }
  return local;
};

const renderList = (logs) => {
  if (logs.length > 0) {
    logs.forEach(element => console.log('- ' + element));
  }
};

const endLine = () => {
  console.log('');
};

module.exports = {
  getError,
  readTemplate,
  writeTemplate,
  checkPackage,
  validate,
  currentPath,
  getPathFile,
  checkDirectory,
  getRootPath,
  getVersion,
  checkResource,
  endLine,
  renderList,
  readOption,
  readArg,
  checkPkgAndFlag
};
