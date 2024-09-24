import { useEffect, useRef } from 'react'
import { useContext } from 'react'

import blogService from './services/blogs'
import UserContext from './contexts/UserContext'

import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import BlogDisplay from './components/BlogDisplay'
import Togglable from './components/Togglable'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const createFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  return (
    <div>
      <h2>blogs</h2>

      <Notification className="success" />
      <Notification className="error" />

      {user === null && <LoginForm />}
      {user !== null &&
      <div>
        <UserInfo />

        <h2>create new</h2>

        <Togglable buttonLabel="new blog" ref={createFormRef}>
          <CreateForm togglableRef={createFormRef}/>
        </Togglable>

        <BlogDisplay />
      </div>
      }
    </div>
  )
}

export default App