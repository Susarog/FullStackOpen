const App = () => {
  const courseName = 'Half Stack application development';
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDescriptionBase extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CourseDescriptionBase {
    type: 'normal';
  }

  interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
  }
  interface CourseSpecialPart extends CourseDescriptionBase {
    type: 'special';
    requirements: Array<string>;
  }

  interface CourseSubmissionPart extends CourseDescriptionBase {
    type: 'submission';
    exerciseSubmissionLink: string;
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the easy course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const Part = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
    return (
      <div>
        {courseParts.map((course) => {
          switch (course.type) {
            case 'normal':
              return (
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                  <br />
                  <i>{course.description}</i>
                </p>
              );
              break;
            case 'groupProject':
              return (
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                  <br />
                  project exercises {course.groupProjectCount}
                </p>
              );
              break;
            case 'submission':
              return (
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                  <br />
                  <i>{course.description}</i>
                  <br />
                  submit to {course.exerciseSubmissionLink}
                </p>
              );
              break;

            case 'special':
              return (
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                  <br />
                  <i>{course.description}</i>
                  <br />
                  required skills: {course.requirements.join(', ')}
                </p>
              );
              break;
            default:
              assertNever(course);
          }
        })}
      </div>
    );
  };
  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  interface CourseProps {
    name: string;
    exerciseCount: number;
  }
  const Content = ({ courseParts }: { courseParts: Array<CourseProps> }) => {
    return (
      <>
        <p>
          {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
          {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
          {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
      </>
    );
  };

  const Total = ({ courseParts }: { courseParts: Array<CourseProps> }) => {
    return (
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Part courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
