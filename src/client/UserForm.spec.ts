import { UserForm } from './UserForm';

describe('Test UserForm component', () => {
  test('Check the component is not null', () => {
      expect(new UserForm({
        user: null!,
        createUser: () => null,
        updateUser: () => null,
        history: null!,
        location: null!,
        match: null!
      })).not.toEqual(null);
  });
});
