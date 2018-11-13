import { UserList } from './UserList';

// TODO - idem
describe('Test UserList component', () => {
  // TODO - idem
  test('Check the component is not null', () => {
    // TODO - idem
      expect(UserList({users: [], onUpdateChange: () => null, onDeleteChange: () => null})).not.toEqual(null);
  });
});
