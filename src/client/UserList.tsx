import * as React from "react";
import User from "../common/User";
import UserFiltersForm from "./UserFiltersForm";
import UserForm from "./UserForm";

export module UserList {
  export interface Props extends UserFiltersForm.Props {
    users: User[],
    onDeleteChange: (e: User) => void
    onUpdateChange: (e: User) => void
    onCreateChange: (e: User) => void
  }
  export interface State {
    candidate: User;
  }
}

export class UserList extends React.Component<UserList.Props, UserList.State> {
  constructor(props: UserList.Props) {
    super(props);

    this.state = {
      candidate: null!
    };
  }

  handleDelete(e: User) {
    this.props.onDeleteChange(e);
  }

  handleUpdate(e: User) {
    this.setState({candidate: e});
  }

  handleSubmit(mode: UserForm.Mode, candidate: User) {
    mode === 'create' ? this.props.onCreateChange(candidate) : this.props.onUpdateChange(candidate);
    this.setState({candidate: null!});
  }

  render() {
    return (
      <div>
        <UserFiltersForm onFiltersChange={e => this.props.onFiltersChange(e)} />
        <UserForm candidate={this.state.candidate} onSubmit={(mode, candidate) => this.handleSubmit(mode, candidate)}/>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Genre</th>
              <th>adresse ip</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.ipAddress}</td>
                <button onClick={e => this.handleUpdate(user)}>Modifier</button>
                <button onClick={e => this.handleDelete(user)}>Supprimer</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
