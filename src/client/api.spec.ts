import { Api } from './api';
import * as fetchMock from 'jest-fetch-mock';

describe('api.ts', () => {
  (global as any).fetch = fetchMock;

  describe('getUsers()', () => {
    test('Check the getUsers function return not null', () => {
      return Api.getUsers({}).then(users => expect(users).toBeDefined);
    });
  })
});
