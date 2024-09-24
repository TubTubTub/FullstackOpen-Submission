import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const CreateForm = ({ togglableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  const handleNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createNewBlog = (blogObject) => {
    newBlogMutation.mutate({ title, author, url })

    notificationDispatch({ type: 'SET_SUCCESS', payload: `${blogObject.title} by ${blogObject.author} added` })
    setTimeout(() => notificationDispatch({ type: 'SET_SUCCESS', payload: null }), 3000)

    togglableRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title: <input type="text" name="Title" value={title} onChange={ ({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author: <input type="text" name="Author" value={author} onChange={ ({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url: <input type="text" name="Url" value={url} onChange={ ({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm