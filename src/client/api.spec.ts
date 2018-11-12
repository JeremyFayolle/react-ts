import { getUsers } from './api';

describe('Test api', () => {
  test('Check the getUsers function return not null', () => {
      expect(getUsers({})).not.toEqual(null);
  });
});
