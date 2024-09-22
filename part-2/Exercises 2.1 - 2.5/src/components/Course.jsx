const Header = (props) => {
    return (
        <div>
        <h2>{props.course}</h2>
        </div>
    )
}
  
const Part = (props) => {
return(
    <p>{props.part.name} {props.part.exercises}</p>
)
}

const Content = ({ parts}) => {
return (
    parts.map(part => 
    <div key={part.id}>
        <Part part={part} />
    </div>
    )
)
}

const Total = ({ parts }) => {
let exercisesSum = parts.reduce((a, b) => (a.exercises ?? a) + (b.exercises ?? b), 0)
return (
    <div>
    <p><b>total of {exercisesSum} exercises</b></p>
    </div>
)
}

const Course = ({ courses }) => {
return (
    courses.map(course =>
    <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
)
}

export default Course