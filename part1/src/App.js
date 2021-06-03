import React from 'react'

import Content from './components/Content';
import Total from './components/Total';
import Header from './components/Header';

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>

      <Content parts={course.parts}/>
      
      <Total total={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}/>
      
    </div>
  )
}

export default App