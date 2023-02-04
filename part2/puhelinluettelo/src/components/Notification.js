const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='added'>
        {message}
      </div>
    )
  }
  
const Notification_Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  export {Notification,Notification_Error}