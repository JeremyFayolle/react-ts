import { UserPage } from './UserPage';

describe('Test UserPage component', () => {
  test('Check the component is not null', () => {
      expect(new UserPage({
        users: [],
        filters: null!,
        refreshUsers: () => null!,
        addFilters: () => null,
        removeUser: () => null
      })).not.toEqual(null);
  });
});
