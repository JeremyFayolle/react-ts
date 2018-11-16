import * as React from 'react';
import { Provider } from 'react-redux'
import User, { UserFilters } from '../common/User';
import { Store } from 'redux';
import { StoreState, StoreSyncAction } from './store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserPage from './UserPage';
import UserForm from './UserForm';

export module App {
  export interface Props {
  }

  export interface State {
    data: User[],
    userCandidate: UserFilters
  }
}

export class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props) {
    super(props);

    this.state = {
      data: [],
      userCandidate: {}
    };
  }

  render() {
    return (
      <Router>
        <div style={content}>
          <Route path="/" exact component={UserPage} />
          <Route path="/:id" component={UserForm} />
        </div>
      </Router>
    );
  }
}

export default App;

export const flexBox = {
  display: 'flex',
}

export const item = {
  margin: '5px'
}

export const content = {
  width: '300px'
}
