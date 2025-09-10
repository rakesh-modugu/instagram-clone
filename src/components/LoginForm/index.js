import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const onChangeUsername = event => setUsername(event.target.value)

  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onSubmitFailure = msg => {
    setShowSubmitError(true)
    setErrorMsg(msg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1648487014/InstaShare/desktop_ebabom.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1648487013/InstaShare/mobilelogin_htwkhc.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <h1 className="login-form-heading">Insta Share</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>

        {showSubmitError && <p className="error-message">{errorMsg}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
