import * as React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Store } from 'redux';

import User, { UserFilters } from '../common/User';
import { StoreState, StoreSyncAction } from './store';
import UserPage from './UserPage';
import UserForm from './UserForm';

export module App {
  export interface Props {
    store: Store<StoreState, StoreSyncAction>
  }

  export interface State {
    data: User[],
    userFilters: UserFilters
  }
}

export class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props) {
    super(props);

    this.state = { data: [], userFilters: {} };
  }

  // TODO - Type the return;
  render() {
    // TODO - Always prefer CSS to JS for static styles
    // TODO - The constants used in template must be part of the component
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

export default App;

// TODO - Remove useless constants
export const flexBox = {
  display: 'flex',
}

export const item = {
  margin: '5px'
}

export const content = {
  width: '300px'
}
