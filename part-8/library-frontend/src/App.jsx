import { useState, useEffect } from "react"
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (bookList) => {
    let seen = new Set()
    return bookList.filter((book) => {
      let title = book.title
      return seen.has(title) ? false : seen.add(title)
    })
  }
  
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [favouriteGenre, setFavouriteGenre] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)

      if (addedBook.genre === favouriteGenre) {
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: favouriteGenre }}, addedBook)
      }
    }
  })

  useEffect(() => {
    const localStorageToken = localStorage.getItem('library-user-token')
    setToken(localStorageToken)
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setPage("login")
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ?
        <span >
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommendations")}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </span  >
        : <button onClick={() => setPage("login")}>login</button>}
        
        
      </div>

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommendations show={page === "recommendations"} setFavouriteGenre={setFavouriteGenre} />

      <LoginForm show={page === "login"} setError={notify} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
