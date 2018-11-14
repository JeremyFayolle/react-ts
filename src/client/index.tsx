import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Api } from './api';
import App from './App';
import { buildStore, StoreState } from './store';

const storeStateRehydratation: StoreState = localStorage.getItem('storeState') ?
  JSON.parse(localStorage.getItem('storeState')!) :
  {};

Api.getUsers(storeStateRehydratation.userFilters ? storeStateRehydratation.userFilters : {})
  .then(users => buildStore({...storeStateRehydratation, users}))
  .then(store => {
    store.subscribe(() => localStorage.setItem('storeState', JSON.stringify(store.getState())));
    ReactDOM.render(<App store={store}/>, document.getElementById('app'));
  });
