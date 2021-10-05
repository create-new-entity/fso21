import React, { useEffect, useState } from "react";
import {
  useApolloClient,
  useSubscription
} from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import {
  BOOK_ADDED,
  GET_ALL_AUTHORS,
  GET_ALL_BOOKS
} from "./queries";


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const storedToken = localStorage.getItem('phonebook_graphql_token');
    if(storedToken) setToken(storedToken);
  }, []);
  
  const updateCacheWith = async (addedBook) => {
    const includedIn = (set, object) => 
    set.map(p => p.id).includes(object.id)  
    
    const allBooksInCache = await client.readQuery({ query: GET_ALL_BOOKS });
    const allAuthorsInCache = await client.readQuery({ query: GET_ALL_AUTHORS });

    // Updating both books and authors since some user can be in one of those
    // tabs, so both will require update, if either one was clicked.
    // If user has clicked either one of them allBooksInCache/allAuthorsInCache will not be null.
    
    if(allBooksInCache && !includedIn(allBooksInCache.allBooks, addedBook)){
      client.writeQuery({
        query: GET_ALL_BOOKS,
        data: {
          allBooks : allBooksInCache.allBooks.concat(addedBook)
        }
      })
    }
    
    if(allAuthorsInCache && !includedIn(allAuthorsInCache.allAuthors, addedBook.author)){
      client.writeQuery({
        query: GET_ALL_AUTHORS,
        data: {
          allAuthors : allAuthorsInCache.allAuthors.concat(addedBook.author)
        }
      })
    }
    
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('phonebook_graphql_token');
    setPage('authors');
    client.resetStore();
  };

  const pageContent = () => {
    if(page === "authors") return <Authors/>;
    if(page === "books") return <Books/>;
    if(page === "add") return <NewBook setPage={setPage} updateCacheWith={updateCacheWith}/>;
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
