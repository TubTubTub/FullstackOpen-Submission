import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show, setFavouriteGenre }) => {
    const favouriteGenreResult = useQuery(ME)

    const favouriteGenre = favouriteGenreResult.data?.me ? favouriteGenreResult.data.me.favouriteGenre : null

    const booksResult = useQuery(ALL_BOOKS, {
        variables: { genre: favouriteGenre },
    })

    useEffect(() => {
        setFavouriteGenre(favouriteGenre)
    }, [favouriteGenre, setFavouriteGenre])

    if (!show) {
        return null
    }

    if (favouriteGenreResult.loading || booksResult.loading) {
        return <div>loading...</div>
    }

    if (!favouriteGenre) {
        favouriteGenreResult.refetch()
        return <div>loading...</div>
    }

    const books = booksResult.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>

            books in your favourite genre <b>{favouriteGenre}</b>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations