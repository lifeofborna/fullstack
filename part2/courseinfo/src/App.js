

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts ={course.parts}/>
      <Total course= {course} />
    </div>
  )

}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => 
  
  <div>
    {parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} />    
    )}

  </div>

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Total = ({ course }) => {
  return(
    <div>
      
      total of {
        
        course.parts.reduce((sum,part) => 
        
        {  
          return sum + part.exercises
        }, 0)
      
      } exercises
      
      </div>
  )

}





const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return(
    <div>
      <Course course={course} />


    </div>
  )
}

export default App
















