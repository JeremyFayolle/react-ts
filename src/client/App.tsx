import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import UserPage from './UserPage';
import UserForm from './UserForm';


export function App(): JSX.Element {
  return (
    <Router>
      <div className="content">
        <Route path="/" exact component={UserPage} />
        <Route path="/:id" component={UserForm} />
      </div>
    </Router>
  );
}

export default App;
