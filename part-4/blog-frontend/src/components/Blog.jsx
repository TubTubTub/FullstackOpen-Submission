import { useState } from 'react'
import axios from 'axios'

const Blog = ({ blog, user, optionalLikeHandler }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [blogDetails, setBlogDetails] = useState(blog)
  const [blogStyle, setBlogStyle] = useState({
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  })

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = async () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog)
    setBlogDetails(response.data)
  }

  const handleLike =  optionalLikeHandler || addLike

  const handleDelete = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      setBlogStyle({ display: 'none' })

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      await axios.delete(`/api/blogs/${blog.id}`, config)
    }
  }

  return (
    <div style={blogStyle} className="blogClass">
      {blogDetails.title} {blogDetails.author}
      <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>

      <div style={showWhenVisible} className="hiddenClass">

        <div>{blogDetails.url}</div>

        <div>
          <span>likes</span> {blogDetails.likes}
          <button type="button" onClick={handleLike}>like</button>
        </div>

        <div>{blogDetails.user.name}</div>

        {(blog.user.id === user.id) ? <button type="button" onClick={handleDelete}>remove</button> : null}

      </div>
    </div>
  )
}

export default Blog