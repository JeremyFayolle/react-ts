import { buildStore } from './store';

// TODO - idem
describe('Test store', () => {
  // TODO - idem
  test('Check the store creation return not null', () => {
    // TODO - Fix indent
    // TODO - idem
      expect(buildStore({
        users: [], userFilters: null!
      })).not.toEqual(null);
  });
});
