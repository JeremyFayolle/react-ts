import { UserList } from './UserList';

describe('Test UserList component', () => {
  test('Check the component is not null', () => {
      expect(UserList({users: [], onUpdateChange: () => null, onDeleteChange: () => null})).not.toEqual(null);
  });
});
