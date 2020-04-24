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
  REDUX: [
    {
      type : 'confirm',
      name : 'redux',
      message : 'Will you use Redux'
    }
  ],
  PROJECT: [
    {
      type : 'confirm',
      name : 'resources',
      message : 'Initialize with resources (themes, styles, etc.)'
    }
  ]
});
