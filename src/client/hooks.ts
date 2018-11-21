import ApolloClient from 'apollo-client';
import { DocumentNode } from 'apollo-link';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import User, { UserCandidate } from '../common/User';

export const ApolloContext = React.createContext(null as ApolloClient<any>);

const getUsersQuery = gql`
  query {getUsers{_id name}}
`

const createUserMutation = gql`
  mutation createUser($candidate: UserCandidate!) {
    createUser(user: $candidate) { _id firstName lastName gender ipAddress email }
  }
`

const updateUserMutation = gql`
  mutation updateUser($id: ID, $userUpdate: UserCandidate) {
    updateUser(id: $id, userUpdate: $userUpdate) { _id firstName lastName gender ipAddress email }
  }
`

const deleteUserMutation = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`

export function useQuery<T>(query: DocumentNode): { data: T, refreshData: () => void} {
  const client = React.useContext(ApolloContext);
  const [state, setState] = React.useState<{ data: T, init: boolean }>({data: null, init: false});

  const refreshData = () => client.query<T>({query, fetchPolicy: 'no-cache'}).then(res => setState({data: res.data, init: true}));

  if (!state.init) {
    setState({init: true, data: null});
    refreshData();
  }
  return {data: state.data, refreshData};
}

export function useMutation<T, P>(mutation: DocumentNode): {data: T, run: (variables: P) => void } {
  const client = React.useContext(ApolloContext);
  const [data, setData] = React.useState<T>(null);
  const run = (variables: P) => client.mutate<T>({mutation, variables}).then(res => setData(res.data));
  return {data, run};
}

export function useCreateUser(): {
  candidate: UserCandidate,
  setCandidateProp: <K extends keyof User>(key: K, prop: User[K]) => void,
  save: (candidate: UserCandidate) => void,
  redirection?: string
} {
  const [candidate, setCandidate] = useState<UserCandidate>(
    { firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: '' }
  );
  const setCandidateProp = <K extends keyof User>(key: K, prop: User[K]) => setCandidate( {...candidate, [key]: prop});

  const {data, run} = useMutation<User, { candidate: UserCandidate }>(createUserMutation);

  const save = (candidate: UserCandidate) => run({candidate});

  const redirection = data ? '/' + data._id : null;

  return {candidate, setCandidateProp, save, redirection: redirection};
}

// export function useUpdateUser(id: string, userUpdate: User): User {
//   return useMutation(updateUserMutation, {id: id, userUpdate: userUpdate});
// }

export function useDeleteUser(): { deleteUser: ( id: string) => void} {
  const {run} = useMutation<any, {_id: string}>(deleteUserMutation);

  const deleteUser = (id: string) => run({_id: id});

  return {deleteUser};
}
