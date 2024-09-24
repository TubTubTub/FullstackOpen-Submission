import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSuccessNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const CreateForm = ({ togglableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createNewBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setSuccessNotification(`${blogObject.title} by ${blogObject.author} added`, 3))

    togglableRef.current.toggleVisibility()
  }

  return (
    <Form onSubmit={handleNewBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control type="text" name="Title" value={title} onChange={ ({ target }) => setTitle(target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control type="text" name="Author" value={author} onChange={ ({ target }) => setAuthor(target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control type="text" name="Url" value={url} onChange={ ({ target }) => setUrl(target.value)}/>
      </Form.Group>
      <Button className="my-3" variant="primary" type="submit">create</Button>
    </Form>
  )
}

export default CreateForm