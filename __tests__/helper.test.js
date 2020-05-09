const helper = require('../src/utils/helper');

test('schematic name without suffix', () => {
  expect(helper.clearSchematicName('user', 'screen')).toBe('User');
});

test('schematic name with suffix', () => {
  expect(helper.clearSchematicName('userScreen', 'screen')).toBe('User');
});

test('schematic name with suffix lowercase', () => {
  expect(helper.clearSchematicName('userscreen', 'screen')).toBe('User');
});
