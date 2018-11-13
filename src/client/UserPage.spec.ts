import { UserPage } from './UserPage';

// TODO - idem
describe('Test UserPage component', () => {
  // TODO - idem
  test('Check the component is not null', () => {
    // TODO - idem
      expect(new UserPage({
        users: [],
        filters: null!,
        refreshUsers: () => null!,
        addFilters: () => null,
        removeUser: () => null
      })).not.toEqual(null);
  });
});
