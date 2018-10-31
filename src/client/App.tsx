import * as React from 'react';
import UserList from './UserList';
import User, { UserFilters } from '../common/User';

export class App extends React.Component<{}, {
  data: User[],
  userCandidate: UserFilters}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      userCandidate: {}
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(
        data => {
          this.setState({data});
        },
        err => console.error(err)
      );
  }

  handleUserFiltersChange(e: UserFilters) {
    fetch('/api/users' + (e.lastName !== '' ? '?lastName=' + e.lastName : ''))
      .then(response => response.json())
      .then(
        data => this.setState({data}),
        err => console.error(err)
      );
  }

  handleUserFormChange(e: User) {
    fetch('/api/users', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify(e)})
      .then(response => response.json())
      .then(
        data => this.setState({data}),
        err => console.error(err)
      );
  }

  handleUserUpdateChange(e: User) {
    fetch('/api/users/'+e._id, {
      method: 'PUT',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify(e)})
      .then(response => response.json())
      .then(
        data => this.setState({data}),
        err => console.error(err)
      );
  }

  handleUserDeleteChange(e: User) {
    fetch('/api/users/'+e._id, {method: 'DELETE'})
      .then(response => response.json())
      .then(
        data => this.setState({data}),
        err => console.error(err)
      );
  }

  render() {
    return (
      <UserList
        users={this.state.data}
        onFiltersChange={e => this.handleUserFiltersChange(e)}
        onCreateChange={e => this.handleUserFormChange(e)}
        onUpdateChange={e => this.handleUserUpdateChange(e)}
        onDeleteChange={e => this.handleUserDeleteChange(e)} />
    );
  }
}

export default App;
