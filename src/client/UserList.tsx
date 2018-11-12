import * as React from 'react';
import User from '../common/User';
import { flexBox, item } from './App';

export module UserList {
  export interface Props {
    users: User[];
    onUpdateChange: (e: User) => void;
    onDeleteChange: (e: User) => void;
  }
}

export function UserList (props: UserList.Props) {
  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
            <th>Adresse ip</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.users ? props.users.map(user => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.ipAddress}</td>
                <td style={flexBox}>
                  <button style={item} className="button is-link" onClick={e => props.onUpdateChange(user)}>Modifier</button>
                  <button style={item} className="button is-danger" onClick={e => props.onDeleteChange(user)}>Supprimer</button>
                </td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
