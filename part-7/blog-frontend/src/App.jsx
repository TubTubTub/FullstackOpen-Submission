import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import NavigationMenu from './components/NavigationMenu'
import Notification from './components/Notification'
import BlogDisplay from './components/BlogDisplay'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import Blog from './components/Blog'


const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const createFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const Blogs = () => {
    return (
      <div>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={createFormRef}>
            <CreateForm togglableRef={createFormRef}/>
          </Togglable>
          <BlogDisplay blogs={blogs} />
      </div>
    )
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <div className="container py-3">
      <Notification className="success" />
      <Notification className="error" />

      {user === null &&
        <div>
          <h2 className="display-5">blogs</h2>
          <LoginForm />
        </div>
      }

      {user !== null &&
        <div>
          <NavigationMenu />
          <h2 className="display-5 py-3">blog app</h2>

          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users/*" element={<UserList />} >
            <Route />
            </Route>
          </Routes>
        </div>
      }
    </div>
  )
}

export default App