import App from './App';

describe('Test App component', () => {
  test('Check the component is not null', () => {
    expect(new App({store: null!})).not.toEqual(null);
  });
});
