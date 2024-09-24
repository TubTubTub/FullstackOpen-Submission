import { useSelector, useDispatch } from 'react-redux'
import { setSuccessNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    console.log('Logging out...')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setSuccessNotification(`Successfully logged out from ${user.name}`, 3))
    dispatch(setUser(null))
  }

  return (
    <span>
      {user.name} logged in <Button variant="outline-secondary" size="sm" type="button" onClick={handleLogout}>logout</Button>
    </span>
  )
}

export default UserInfo