import { useState } from 'react'

const Button = ( {onClick, text} ) => <button onClick={onClick}>{text}</button>

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{Number(props.value).toFixed(2)}</td>
  </tr>
)

const Statistics = (props) => {
  if ((props.good == 0) && (props.neutral == 0) && (props.bad == 0)) {
    return(
      <p>No feedback given</p>
    )
  }
  return (
  <table><tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value={(props.good + props.neutral + props.bad)/3} />
      <StatisticLine text="positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100 + '%'} />
  </tbody></table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [selected, setSelected] = useState(0)
  const [quote, setQuote] = useState('If it hurts, do it more often.')

  const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
  ]

  const anecdotePoints = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  }
  
  const [quoteVotes, setQuoteVotes] = useState(anecdotePoints)

  const randomizeAnecdote = () => {
    let randomInt
    do {
      randomInt = Math.floor(Math.random() * anecdotes.length)
    } while (randomInt == selected)
    setSelected(randomInt)
  }

  const updateAnecdotePoints = () => {
    let copy = {...quoteVotes}
    copy[selected] += 1
    setQuoteVotes(copy)

    let highestCountIndex = Object.keys(copy).reduce((a, b) => copy[a] < copy[b] ? b : a)
    
    if (copy[selected] >= copy[highestCountIndex]) {
      setQuote(anecdotes[highestCountIndex])
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {quoteVotes[selected]} points</p>
      <div>
        <Button onClick={updateAnecdotePoints} text="vote" />
        <Button onClick={randomizeAnecdote} text="next anecdote" />
      </div>
      
      <h1>Anecdote with most votes</h1>
      {quote}
    </div>
  )
}

export default App