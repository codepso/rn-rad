const helper = require('../src/utils/helper');

test('schematic name without suffix', () => {
  expect(helper.getSchematicName('user', 'screen')).toBe('UserScreen');
});

test('schematic name with suffix', () => {
  expect(helper.getSchematicName('userScreen', 'screen')).toBe('UserScreen');
});
