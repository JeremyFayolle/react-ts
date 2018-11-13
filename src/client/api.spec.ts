import { getUsers } from './api';

// TODO - Describe text must be the name of a file or a module
describe('Test api', () => {
  // TODO - Describe the function then test some of its capabilities
  test('Check the getUsers function return not null', () => {
      // TODO - Use toBeDefined
      // TODO - Don't test the result but the promised result
      expect(getUsers({})).not.toEqual(null);
  });
});
