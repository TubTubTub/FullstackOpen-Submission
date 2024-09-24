import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { updateCache } from '../App'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ newBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS, variables: { genre: 'Crazy' }}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(error => error.message).join(`\n`)
      props.setError(messages)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS, variables: { genre: null } }, response.data.addBook)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    
    const result = newBook({ variables: { title, author, published: Number(published), genres }})
    if (!result.loading) console.log(result)
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook