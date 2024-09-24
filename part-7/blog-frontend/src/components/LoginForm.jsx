import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)

      try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        blogService.setToken(user.token)

        dispatch(setUser(user))
        setUsername('')
        setPassword('')
        dispatch(setSuccessNotification(`Successfully logged in as ${user.name}`, 3))

        console.log('user state:', user)

      } catch (exception) {
        console.log('exception')
        dispatch(setErrorNotification('Wrong credentials', 3))
      }
    }

    return (
      <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control type="text" name="Username" value={username} onChange={ ({ target }) => setUsername(target.value) }/>
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control type="password" name="Password" value={password} onChange={ ({ target }) => setPassword(target.value) }/>
          </Form.Group>
        <Button className="my-2" type="submit">login</Button>
      </Form>
    )
}

LoginForm.propTypes = {}

export default LoginForm