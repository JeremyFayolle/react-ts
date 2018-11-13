// TODO - Organize your imports between external and internal with empty line separator.
import User, { UserFilters } from '../common/User';
import 'isomorphic-fetch';

// TODO - Create a class or a moudule for design purpose.
// TODO - Save the API path with a constant.
export function getUsers(filters: UserFilters): Promise<User[]> {
  return fetch('/api/users' + (filters.lastName ? '?lastName=' + filters.lastName : '')).then(response => response.json())
}

export function createUser(candidate: User): Promise<User[]> {
  return fetch('/api/users', {
    method: 'POST',
    // TODO - Missing space after comma
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(candidate)})
    .then(response => response.json(), err => console.error(err))
}

export function removeUser(user: User): Promise<User[]> {
  // TODO - Always wrap separator with spaces
  return fetch('/api/users/'+user._id, {method: 'DELETE'})
    .then(response => response.json(), err => console.error(err))
}

export function editUser(user: User): Promise<User[]> {
  // TODO - idem
  return fetch('/api/users/'+user._id, {
    method: 'PUT',
    // TODO - idem
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    // TODO - Single line
    body: JSON.stringify(user)})
    .then(response => response.json(), err => console.error(err))
}
