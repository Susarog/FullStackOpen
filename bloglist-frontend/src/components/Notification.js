import { Alert } from 'react-bootstrap'
const Notification = ({ message, variant }) => {
  if (message === null) {
    return null
  }

  return <Alert variant={`${variant}`}>{message}</Alert>
}

export default Notification
