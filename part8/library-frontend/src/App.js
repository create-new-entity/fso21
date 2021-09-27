import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const storedToken = localStorage.getItem('phonebook_graphql_token');
    if(storedToken) setToken(storedToken);
  }, []);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('phonebook_graphql_token');
    setPage('authors');
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token ?
          <button onClick={() => setPage("add")}>add book</button>
          :
          null
        }
        {
          token ? 
          <button onClick={logoutHandler}>logout</button>
          :
          <button onClick={() => setPage("login")}>login</button>
        }
        
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setPage={setPage}/>

      {
        !token && page === 'login' ?
        <Login setToken={(token) => { setPage('authors'); setToken(token);}}/>
        :
        null
      }
    </div>
  );
};

export default App;
