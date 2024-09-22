const Persons = ( {persons} ) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = (props) => {
  return (<p> {props.person.name} {props.person.number}</p>)
}

export default Persons