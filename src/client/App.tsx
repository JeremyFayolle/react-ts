import * as React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Store } from 'redux';

import User, { UserFilters } from '../common/User';
import { StoreState, StoreSyncAction } from './store';
import UserPage from './UserPage';
import UserForm from './UserForm';

export class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props) {
    super(props);

    this.state = { data: [], userFilters: {} };
  }

  render(): JSX.Element {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div className="content">
            <Route path="/" exact component={UserPage} />
            <Route path="/:id" component={UserForm} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export module App {
  export interface Props {
    store: Store<StoreState, StoreSyncAction>
  }

  export interface State {
    data: User[],
    userFilters: UserFilters
  }
}

export default App;
