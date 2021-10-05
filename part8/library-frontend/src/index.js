import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  split
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './App';


const authLink = new ApolloLink((operation, forward) => {

  operation.setContext((_, prevContext) => {
    const token = localStorage.getItem('phonebook_graphql_token');

    if(prevContext && prevContext.headers) {
      return {
        headers: {
          ...prevContext.headers,
          authorization: token ? `bearer ${token}` : null,
        }
      };
    }

    return {
      headers: {
        authorization: token ? `bearer ${token}` : null,
      }
    };

  });

  return forward(operation);
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))