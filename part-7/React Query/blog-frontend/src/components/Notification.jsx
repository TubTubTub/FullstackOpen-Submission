import  '../styles/notification.css'
import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = ({ className }) => {
    const notification = useNotificationValue()

    let message = null
    if (className === 'success') {
      message = notification.successMessage
    }
    else if (className === 'error') {
      message = notification.errorMessage
    }

    if (message === null) {
      return null
    }

    return (
      <div className={className}>
        {message}
      </div>
    )
}

export default Notification