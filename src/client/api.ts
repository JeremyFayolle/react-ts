import User, { UserFilters } from '../common/User';

export module Api {
  function request<T>(uri: string, init?: RequestInit): Promise<T> {
    const url = '//' + window.location.host + '/api' + uri;
    return fetch(url, init).then(response => response.json())
  }

  const userUri = '/users';

  export function getUsers(filters: UserFilters): Promise<User[]> {
    return request(userUri + (filters.lastName ? '?lastName=' + filters.lastName : ''));
  }

  export function createUser(candidate: User): Promise<User[]> {
    return request(userUri, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(candidate)});
  }

  export function removeUser(user: User): Promise<User[]> {
    return request(`${userUri}/${user._id}`, {method: 'DELETE'});
  }

  export function editUser(user: User): Promise<User[]> {
    return request(`${userUri}/${user._id}`, {
      method: 'PUT',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
  }

}

