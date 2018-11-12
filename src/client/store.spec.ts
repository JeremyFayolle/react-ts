import { buildStore } from './store';

describe('Test store', () => {
  test('Check the store creation return not null', () => {
      expect(buildStore({
        users: [], userFilters: null!
      })).not.toEqual(null);
  });
});
