import PropTypes from 'prop-types'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <div>
          username
        <input
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
          password
        <input
          id='password'
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit" onClick={handleSubmit}>login</button>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
