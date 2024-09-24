import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import  './styles/notification.css'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        username <input type="text" name="Username" value={props.username} onChange={ ({ target }) => props.onUsernameChange(target.value) }/>
      </div>
      <div>
        password <input type="password" name="Password" value={props.password} onChange={ ({ target }) => props.onPasswordChange(target.value) }/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
const UserInfo = (props) => {
  return (
    <div>
      {props.user.name} logged in <button type="button" onClick={props.onLogoutClick}>logout</button>
    </div>
  )
}
const BlogDisplay = ({ blogs, user }) => {
  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    return 1
  }

  return (
    <div>
      {blogs.sort(sortByLikes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}
const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([{ title: 'fetching blogs...', id: 'lol', user: { name: '', id: '' } }])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      console.log(blogs, 'blogs')
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Successfully logged in as ${user.name}`)
      setTimeout(() => setSuccessMessage(null), 3000)

      console.log('user state:', user)

    } catch (exception) {
      console.log('exception')
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setSuccessMessage(`Successfully logged out from ${user.name}`)
    setTimeout(() => setSuccessMessage(null), 3000)
    setUser(null)
  }

  const createNewBlog = async (blogObject) => {
    const newBlog = { ...blogObject, likes: 0 }
    const response = await blogService.create(newBlog)
    console.log(response)
    setBlogs(blogs.concat(response))

    setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => setSuccessMessage(null), 3000)

    createFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />

      {user === null && <LoginForm onSubmit={handleLogin} username={username} password={password} onUsernameChange={setUsername} onPasswordChange={setPassword} />}
      {user !== null &&
      <div>
        <UserInfo user={user} onLogoutClick={handleLogout}/>

        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={createFormRef}>
          <CreateForm createNewBlog={createNewBlog} />
        </Togglable>
        <BlogDisplay blogs={blogs} user={user} />
      </div>
      }
    </div>
  )
}

export default App