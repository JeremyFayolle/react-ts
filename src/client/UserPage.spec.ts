import { UserPage } from './UserPage';

describe('UserPage.ts', () => {
  describe('new UserPage()', () => {
    test('Check the component is not null', () => {
      expect(new UserPage({
        users: [],
        filters: null!,
        refreshUsers: () => null!,
        addFilters: () => null,
        removeUser: () => null
      })).toBeDefined();
    });
  });
});
