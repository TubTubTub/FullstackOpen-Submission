import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import { useUserValue } from '../contexts/UserContext'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const user = useUserValue()
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = async () => {
    setVisible(!visible)
  }

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (likedBlog) => {
      console.log(likedBlog)
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    }
  })

  const handleLike = () => {
    console.log('Liked blog...')

    const likedObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
      user: blog.user.id
    }

    likeBlogMutation.mutate(likedObject)

    notificationDispatch({ type: 'SET_SUCCESS', payload: `liked ${likedObject.title}` })
    setTimeout(() => notificationDispatch({ type: 'SET_SUCCESS', payload: null }), 3000)
}
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)

      notificationDispatch({ type: 'SET_SUCCESS', payload: `removed ${blog.title}` })
      setTimeout(() => notificationDispatch({ type: 'SET_SUCCESS', payload: null }), 3000)
    }
  }

  return (
    <div style={blogStyle} className="blogClass">
      {blog.title} {blog.author}
      <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>

      <div style={showWhenVisible} className="hiddenClass">

        <div>{blog.url}</div>

        <div>
          <span>likes</span> {blog.likes}
          <button type="button" onClick={handleLike}>like</button>
        </div>

        <div>{blog.user.name}</div>

        {(blog.user.id === user.id) ? <button type="button" onClick={handleDelete}>remove</button> : null}

      </div>
    </div>
  )
}

export default Blog