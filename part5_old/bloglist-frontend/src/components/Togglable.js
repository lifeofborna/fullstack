import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hiddenStyle = { display: visible ? 'none' : '' }
  const visibleStyle = { display: visible ? '' : 'none' }

  return (
    <div className="togglableContent">
      <div style={hiddenStyle} className="togglableContentHidden">
        <button onClick={toggleVisibility} className="toggleButton">{props.buttonLabel}</button>
      </div>
      <div style={visibleStyle} className="togglableContentVisible">
        {props.children}
        <button onClick={toggleVisibility} className="toggleButton">cancel</button>
      </div>
    </div>
  )
}
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
