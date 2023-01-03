
const Header = (prop) => {
  return(
    <div>
      <h1>{prop.course['name']}</h1>
    </div>
  )
}

const Content = (parts) => {
  console.log(parts.course['parts'][0])
  return(
    <div>
      <Part name={parts.course['parts'][0]['name']} ex={parts.course['parts'][0]['exercises']} />
      <Part name={parts.course['parts'][1]['name']} ex={parts.course['parts'][1]['exercises']} />
      <Part name={parts.course['parts'][2]['name']} ex={parts.course['parts'][2]['exercises']} />
    </div>
  )
}

const Total = (parts) => {
  return(
    <div>
      <p>Number of exercises {parts.course['parts'][0]['exercises'] + parts.course['parts'][1]['exercises']+ parts.course['parts'][2]['exercises']}</p>
    </div>
  )
}

const Part = (prop) => {
  return(
    <div>
      <p>{prop.name} {prop.ex} </p>
    </div>
  )
}

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

 // console.log(course['parts'][0]['name'])


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App

//Header takes care of rendering the name of the course//part1={parts[0]['name']} exercises1={parts[0]['exercises']} part2={parts[1]['name']} exercises2={parts[1]['exercises']} part3={parts[2]['name']} exercises3={parts[2]['exercises']}

//ex1={parts[0]['exercises']} ex2={parts[1]['exercises']} ex3={parts[2]['exercises']}