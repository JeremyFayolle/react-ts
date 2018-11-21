import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { ApolloContext } from './hooks';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render(
  (
    <ApolloContext.Provider value={client}>
      <App></App>
    </ApolloContext.Provider>
  ),
  document.getElementById('app')
)
