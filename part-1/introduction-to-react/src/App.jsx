import { useState } from 'react'

const Hello = ( {name, age} ) => {
  const bornYear = new Date().getFullYear() - age
  return(
    <div>
      <p>Hello {name}, you are {age} years old!</p>
      <p>So you were probably born in {bornYear}</p>
    </div>
  )
}

const Display = ({ value }) => <div>{value}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const setCounterToValue = newValue => setCounter(newValue)

  const Jimmy = {
    name: "Jimmy",
    age: 30,
  }

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name={Jimmy.name} age={Jimmy.age} />
      
      <Display value={counter} />
      <Button onClick={() => setCounterToValue(counter + 1)} text={'+'} />
      <Button onClick={() => setCounterToValue(0)} text={'0'} />
      <Button onClick={() => setCounterToValue(counter - 1)} text={'-'} />
    </div>
  )
}

export default App