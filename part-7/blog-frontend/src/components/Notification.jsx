import  '../styles/notification.css'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ className }) => {
    const notification = useSelector(state => state.notification)
    let message = null
    if (className === 'success') {
      message = notification.successMessage
    }
    else if (className === 'error') {
      message = notification.errorMessage
      className = 'danger'
    }

    if (message === null) {
      return null
    }

    return (
      <Alert variant={className}>
        {message}
      </Alert>
    )
}

export default Notification