import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const errorHandler = (error) => {
    console.log(error, error.status, error.response)
    if (error.response.request.status === 400) {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `too short anecdote, must have length 5 or more`})
      setTimeout(() => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: null})
      }, 5000)
    }
    else {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `unknown error`})
      setTimeout(() => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: null})
      }, 5000)
    }
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: errorHandler
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: Math.floor(Math.random() * 100000), votes: 0 })
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `new anecdote created: ${content}`})
    setTimeout(() => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: null})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm