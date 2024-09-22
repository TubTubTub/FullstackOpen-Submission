const Persons = ( {persons, onDelete} ) => {
  return (
      persons.map(person =>
        <div key={person.id}>
          <Person person={person} /> <button onClick={onDelete} id={person.id} name={person.name}>delete</button>
        </div>
      )
  )
}

const Person = (props) => {
  return (`${props.person.name} ${props.person.number}`)
}

export default Persons