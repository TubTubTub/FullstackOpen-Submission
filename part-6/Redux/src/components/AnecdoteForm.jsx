import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''

        dispatch(createAnecdote(content))
        dispatch(setNotification(`new anecdote created: ${content}`, 3))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdoteInput"/></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm