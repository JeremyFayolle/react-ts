import { UserForm } from './UserForm';

describe('UserForm.tsx', () => {
  describe('new UserForm()', () => {
    test('Check the component is not null', () => {
      expect(new UserForm({
        user: null,
        createUser: () => null,
        updateUser: () => null,
        history: null,
        location: null,
        match: null
      })).toBeDefined();
    });
  });
});
