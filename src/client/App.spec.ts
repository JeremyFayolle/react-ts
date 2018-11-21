import App from './App';

describe('App.tsx', () => {
  describe('new App()', () => {
    test('Check the component is not null', () => {
      expect(new App({store: null})).toBeDefined();
    });
  });
});
