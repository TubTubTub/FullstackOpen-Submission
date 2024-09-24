import { useSelector, useDispatch } from 'react-redux'
import { setSuccessNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { Table, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog) return <p>Loading blog...</p>

  const handleLike = () => {
    console.log('Liked blog...')

    const likedObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
      user: blog.user.id,
      comments: blog.comments
    }

    dispatch(likeBlog(likedObject))
    dispatch(setSuccessNotification(`liked ${likedObject.title}`, 3))
}
  const handleDelete = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setSuccessNotification(`removed ${blog.title}`, 3))
      navigate('/')
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const input = event.target.commentInput.value

    const commentedObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      id: blog.id,
      user: blog.user.id,
      comments: blog.comments.concat(input)
    }

    dispatch(commentBlog(commentedObject))
  }

  return (
    <div className="blogClass">
      <Table bordered>
        <thead className="align-middle">
          <tr>
            <td>
              <h2>{blog.title} {blog.author}</h2>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              {blog.url}
            </td>
          </tr>
          <tr>
            <td>likes {blog.likes} <Button size="sm" variant="primary" type="button" onClick={handleLike}>like</Button></td>
          </tr>
          <tr>
            <td>
              added by {blog.user.name}
            </td>
          </tr>
        </tbody>
      </Table>
      {(blog.user.id === user.id) ? <Button variant="secondary" type="button" onClick={handleDelete}>remove</Button> : null}


      <h2>comments</h2>

      <Form onSubmit={handleComment}>
        <Form.Group style={{ display: 'flex' }} className="gap-1 py-2">
          <Form.Control className="w-50" size="sm" type="text" name="commentInput"/>
          <Button size="sm" type="submit">add comment</Button>
        </Form.Group>
      </Form>

      {
        blog.comments.length === 0 ? <p>No comments found</p> :
        <ListGroup variant="flush">
          {blog.comments.map((comment, index) => <ListGroupItem key={index}>{comment}</ListGroupItem>)}
        </ListGroup>
      }

    </div>
  )
}

export default Blog