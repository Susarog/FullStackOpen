const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} name={course.name} parts={course.parts} />
      ))}
    </div>
  );
};

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
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Sum
        value={parts
          .map((part) => part.exercises)
          .reduce((prev, init) => prev + init, 0)}
      />
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

const Sum = ({ value }) => {
  return <div>total of {value} exercises</div>;
};

export default Courses;
