const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
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
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ],
  };

  return <Course course={course} />;
};

export default App