import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [genres, setGenres] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter }
  })

  const books = useMemo(() =>
      result.data ? result.data.allBooks : []
  , [result.data])

  useEffect(() => {
    if (!genreFilter && books) {
      setGenres(new Set(books.map(book => book.genres).flat(1)))
    }
  }, [genreFilter, books])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          
        </tbody>
      </table>

      {
        Array.from(genres).map(genre =>
          <button key={genre} type="button" onClick={() => setGenreFilter(genre)}>{genre}</button>
        )
      }
      <button type="button" onClick={() => setGenreFilter(null)}>reset</button>
    </div>
  )
}

export default Books
