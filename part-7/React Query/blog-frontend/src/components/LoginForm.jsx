import PropTypes from 'prop-types'
import { useState } from 'react'
import { useUserDispatch } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useUserDispatch()

  const notificationDispatch = useNotificationDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      userDispatch({ type: 'SET_USER', payload: user })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SET_SUCCESS', payload: `Successfully logged in as ${user.name}` })
      setTimeout(() => notificationDispatch({ type: 'SET_SUCCESS', payload: null }), 3000)

      console.log('user state:', user)

    } catch (exception) {
      console.log('exception')
      notificationDispatch({ type: 'SET_ERROR', payload: 'Wrong credentials' })
      setTimeout(() => notificationDispatch({ type: 'SET_ERROR', payload: null }), 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" name="Username" value={username} onChange={ ({ target }) => setUsername(target.value) }/>
      </div>
      <div>
        password <input type="password" name="Password" value={password} onChange={ ({ target }) => setPassword(target.value) }/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {}

export default LoginForm