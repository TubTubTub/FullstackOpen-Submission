import { useContext } from 'react'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

const UserInfo = () => {
  const notificationDispatch = useNotificationDispatch()
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = (event) => {
    console.log('Logging out...')

    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'SET_USER', payload: null })

    notificationDispatch({ type: 'SET_SUCCESS', payload: `Successfully logged out from ${user.name}` })
    setTimeout(() => notificationDispatch({ type: 'SET_SUCCESS', payload: null }), 3000)
  }

  return (
    <div>
      {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserInfo