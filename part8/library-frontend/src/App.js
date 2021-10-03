import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";


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

  const pageContent = () => {
    if(page === "authors") return <Authors/>;
    if(page === "books") return <Books/>;
    if(page === "add") return <NewBook setPage={setPage}/>;
    if(page === "recommendations") return <Recommendations/>;
    if(!token && page === 'login') return <Login setToken={(token) => { setPage('authors'); setToken(token);}}/>;
    return null;
  };

  const navigationContent = () => {
    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token
          ?
            <React.Fragment>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommendations")}>recommended</button>
            </React.Fragment>
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
    );
  };

  return (
    <div>
      {
        navigationContent()
      }
      {
        pageContent()
      }
    </div>
  );
};

export default App;
