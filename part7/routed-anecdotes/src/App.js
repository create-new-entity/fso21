import React, { useState } from 'react';
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from "react-router-dom";

import { useField } from './hooks';

const Anecdote = ({ anecdote }) => {
  return (
    <React.Fragment>
      <h2>
        { anecdote.content }
      </h2>
      <p>
        { `has ${anecdote.votes} votes` }
      </p>
    </React.Fragment>
  );
};

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(
          anecdote => 
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>
        )
      }
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const contentInput = useField('text');
  const authorInput = useField('text');
  const infoInput = useField('text');
  const submitInput = useField('submit', 'create');

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentInput.value,
      author: authorInput.value,
      info: infoInput.value,
      votes: 0
    })
  }
  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...contentInput } />
        </div>
        <div>
          author
          <input { ...authorInput } />
        </div>
        <div>
          url for more info
          <input { ...infoInput } />
        </div>
        <input { ...submitInput }/>

      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  const padding = {
    padding: 5,
    borderColor: 'black',
    borderRadius: 2,
    borderStyle: 'solid',
    marginTop: 10
  }

  if(!notification) return null;

  return (
    <div style={padding}>
      { notification }
    </div>
  );
};

const App = () => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id)) : null;

  const [notification, setNotification] = useState('');
  const history = useHistory();

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
    history.push('/');
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote}/>
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;