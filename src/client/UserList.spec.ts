import { UserList } from './UserList';

describe('UserList.ts', () => {
  describe('UserList()', () => {
    test('Check the component is not null', () => {
      expect(UserList({users: [], onUpdateChange: () => null, onDeleteChange: () => null})).toBeDefined();
    });
  });
});
