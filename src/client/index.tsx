import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import { getUsers } from "./api";
// TODO - idem
import { buildStore, StoreState, StoreSyncAction } from "./store";

// TODO - Break lines for better readability
const storeStateRehydratation: StoreState = localStorage.getItem('storeState') ? JSON.parse(localStorage.getItem('storeState')!) : {};

// TODO - Passing the whole userFilters seems a better solution
getUsers({lastName: storeStateRehydratation.userFilters && storeStateRehydratation.userFilters.lastName})
  .then(users => buildStore({...storeStateRehydratation, users}))
  .then(store => {
    store.subscribe(() => localStorage.setItem('storeState', JSON.stringify(store.getState())));
    // TODO - Single line
    ReactDOM.render(
      <App store={store}/>,
      document.getElementById('app')
    );
  });
