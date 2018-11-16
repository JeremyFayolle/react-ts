import { UserFiltersForm } from './UserFiltersForm';

describe('UserFiltersForm.tsx', () => {
  describe('UserFiltersForm()', () => {
    test('Check the component is not null', () => {
      expect(UserFiltersForm({filters: null!, addUserFilters: () => null!})).toBeDefined();
    });
  });
});
