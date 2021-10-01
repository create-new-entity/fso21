import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from "@apollo/client";

import App from './App';


const authLink = new ApolloLink((operation, forward) => {

  operation.setContext((_, prevContext) => {
    const token = localStorage.getItem('phonebook_graphql_token');
    console.log('token', token);

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

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))