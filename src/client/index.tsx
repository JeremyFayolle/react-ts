import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import { DocumentNode } from 'apollo-link';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const getUsersQuery = gql`
  query {getUsers{id name}}
`
// client.query({ query: getUsersQuery }).then(console.log);

const ApolloContext = React.createContext(null! as ApolloClient<any>);


export function Test() {
  const data = useQuery(getUsersQuery);
  console.log(data);
  return (<div />);
}

export function useQuery<T>(query: DocumentNode): T {
  const client = React.useContext(ApolloContext);
  const [state, setState] = React.useState<{ data: T, init: boolean }>({data: null!, init: false});
  if (!state.init) {
    setState({init: true, data: null!});
    client.query<T>({query}).then(res => setState({data: res.data, init: true}));
  }
  return state.data;
}

ReactDOM.render(
  (
    <ApolloContext.Provider value={client}>
      <Test></Test>
    </ApolloContext.Provider>
  ),
  // <ApolloProvider client={client}>
  //   <Query query={getUsersQuery}>
  //     {({ loading, error, data }) => {
  //       if (loading) return <p>Loading...</p>;
  //       if (error) return <p>Error :(</p>;

  //       return data.getUsers.map(({name}: { name: string }) => (
  //         <div key={name}>
  //           <p>{name}</p>
  //         </div>
  //       ));
  //     }}
  //   </Query>
  // </ApolloProvider>,
  document.getElementById('app')
)
