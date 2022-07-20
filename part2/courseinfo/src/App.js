const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => <Course key={course.id} name={course.name} parts={course.parts}/>)}
    </div>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <Sum value={parts.map(part => part.exercises).reduce((prev,init) => prev + init,0)}/>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  );
};

const Sum = ({value}) => {
  return (
    <div>
      total of {value} exercises
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />;
};

export default App