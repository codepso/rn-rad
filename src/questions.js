const helper = require('./helper');
const constants = require('./constants');

module.exports = Object.freeze({
  COMPONENT: [
    {
      type : 'input',
      name : 'name',
      message : 'What will be the name?',
      validate : async (input) => {
        return helper.validate(input, 'alpha');
      }
    },
    {
      type : 'input',
      name : 'path',
      message : 'Where will it be saved?',
      default: constants.COMPONENT_PATH
    }
  ],
  REDUX: [
    {
      type : 'confirm',
      name : 'redux',
      message : 'Will you use Redux?'
    }
  ]
});
