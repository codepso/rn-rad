const helper = require('../utils/helper');
const constants = require('./constants');

module.exports = Object.freeze({
  COMPONENT: {
    name: {
      type: 'input',
      name: 'name',
      message: 'What will be the name',
      validate: async (input) => {
        return helper.validate(input, 'alpha');
      }
    },
    path: {
      type : 'input',
      name : 'path',
      message : 'Where will it be saved',
      default: constants.COMPONENT_PATH
    }
  },
  SCREEN: {
    name: {
      type : 'input',
      name : 'name',
      message : 'What will be the name',
      validate : async (input) => {
        return helper.validate(input, 'alpha');
      }
    },
    path: {
      type : 'input',
      name : 'path',
      message : 'Where will it be saved',
      default: constants.SCREEN_PATH
    }
  },
  FORM: {
    name: {
      type : 'input',
      name : 'name',
      message : 'What will be the name',
      validate : async (input) => {
        return helper.validate(input, 'alpha');
      }
    },
    path: {
      type : 'input',
      name : 'path',
      message : 'Where will it be saved',
      default: constants.FORM_PATH
    },
    view: {
      type : 'confirm',
      name : 'view',
      message : 'Do you need a view?',
    }
  },
  THEME: {
    name: {
      type: 'input',
      name: 'name',
      message: 'What will be the name',
      validate: async (input) => {
        return helper.validate(input, 'alpha');
      }
    }
  },
  REDUX: [
    {
      type : 'confirm',
      name : 'redux',
      message : 'Will you use redux?'
    }
  ],
  PROJECT: [
    {
      type : 'confirm',
      name : 'resources',
      message : 'Initialize with resources (themes, styles, auth, etc.)'
    }
  ],
  LANG: [
    {
      type : 'confirm',
      name : 'lang',
      message : 'Will you use i18n?'
    }
  ],
});
