import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import { getUsers } from './api';
import { buildStore, StoreState } from './store';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const storeStateRehydratation: StoreState = localStorage.getItem('storeState') ? JSON.parse(localStorage.getItem('storeState')!) : {};

// getUsers({lastName: storeStateRehydratation.userFilters && storeStateRehydratation.userFilters.lastName})
//   .then(users => buildStore({...storeStateRehydratation, users}))
//   .then(store => {
//     store.subscribe(() => localStorage.setItem('storeState', JSON.stringify(store.getState())));
//     ReactDOM.render(
//       <App store={store}/>,
//       document.getElementById('app')
//     );
//   });

  ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app')
  )
