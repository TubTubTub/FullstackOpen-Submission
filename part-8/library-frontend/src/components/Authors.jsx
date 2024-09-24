import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [changeBorn, changeBornResult] = useMutation(EDIT_AUTHOR,
    {
      onError: (error) => {
        const messages = error.graphQLErrors.map(error => error.message).join('\n')
        props.setError(messages)
      },
      update: (cache) => {
        cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
          return {
            allAuthors: allAuthors.map(author => author.name !== name ? author : { ...author, born: Number(born) })
          }
        })
      }
    }
  )
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (changeBornResult.data && changeBornResult.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [changeBornResult.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = (event) => {
    const name = event.target.name.value
    event.preventDefault()
    
    changeBorn({ variables: { name: name, setBornTo: Number(born) }})

    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : 'unknown'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <select name="name">
          {authors.map(author =>
            <option key={author.id} value={author.name}>{author.name}</option>
          )}
        </select>
        <div>born <input type="number" value={born} onChange={({ target }) => setBorn(target.value)}/></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
