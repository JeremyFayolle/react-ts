import * as React from 'react';

import User from '../common/User';
import { useQuery, useDeleteUser } from './hooks';
import gql from 'graphql-tag';

export function UserList() {
  const {data, refreshData} = useQuery<{getUsers: User[]}>(gql`
    query {getUsers{_id firstName lastName email gender ipAddress}}
  `);
  const {deleteUser} = useDeleteUser();
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
            data ? data.getUsers.map(user => (
                <tr key={user.firstName}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.ipAddress}</td>
                  {<td className="flexBox">
                    {/* <button className="item button is-link" onClick={() => props.onUpdateChange(user)}>Modifier</button> */}
                    <button className="item button is-danger" onClick={() => {deleteUser(user._id), refreshData()}}>Supprimer</button>
                  </td>}
                </tr>
              )) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
