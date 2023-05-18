
const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
const Header = (props) => {
    return <h3>{props.course.name}</h3>
    }

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
    }

const Content = ({parts}) => {
    return (
        parts.map(parts => 
        <Part key={parts.id} part={parts.name} exercises={parts.exercises} />)
    )
    }

const Total = ({parts}) => {
    return <div>
        <b>
        Number of exercises {parts.reduce(function(sum, exercise) {return sum + exercise.exercises}, 0)}
        </b>
    </div>
    }

export default Course;