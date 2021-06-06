const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  return(
    <p>total of {course.parts.reduce((acc, curr) => curr.exercises + acc, 0)} exercises</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {

  let parts = course.parts.map((part) => {
    return <Part part={part} key={part.id}/>;
  });

  return (
    <div>
      {
        parts
      }
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  );
};

export default Course;