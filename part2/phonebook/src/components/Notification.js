const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
    if(!isError) {
      return (<div className='good'>
        {message}
      </div>
      )
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export default Notification