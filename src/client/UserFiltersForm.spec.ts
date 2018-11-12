import { UserFiltersForm } from './UserFiltersForm';

describe('Test UserFiltersForm component', () => {
  test('Check the component is not null', () => {
      expect(UserFiltersForm({
        filters: null!,
        addUserFilters: () => null!
      })).not.toEqual(null);
  });
});
