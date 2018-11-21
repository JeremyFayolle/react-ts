import * as React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom'

import UserPage from './UserPage';
import UserForm from './UserForm';


export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="content">
        <Route path="/" exact component={UserPage} />
        <Route path="/:id" component={UserForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
