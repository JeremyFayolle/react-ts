import { buildStore } from './store';

describe('store.ts', () => {
  describe('buildStore()', () => {
    test('Check the store creation return not null', () => {
      expect(buildStore({users: [], userFilters: null})).toBeDefined();
    });
  });
});
