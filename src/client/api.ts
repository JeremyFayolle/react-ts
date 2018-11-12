import User, { UserFilters } from '../common/User';
import 'isomorphic-fetch';

export function getUsers(filters: UserFilters): Promise<User[]> {
  return fetch('/api/users' + (filters.lastName ? '?lastName=' + filters.lastName : '')).then(response => response.json())
}

export function createUser(candidate: User): Promise<User[]> {
  return fetch('/api/users', {
    method: 'POST',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(candidate)})
    .then(response => response.json(), err => console.error(err))
}

export function removeUser(user: User): Promise<User[]> {
  return fetch('/api/users/'+user._id, {method: 'DELETE'})
    .then(response => response.json(), err => console.error(err))
}

export function editUser(user: User): Promise<User[]> {
  return fetch('/api/users/'+user._id, {
    method: 'PUT',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(user)})
    .then(response => response.json(), err => console.error(err))
}
