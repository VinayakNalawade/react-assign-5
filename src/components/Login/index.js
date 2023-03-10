import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 2})

      const {history} = this.props

      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <form onSubmit={this.submitForm} className="login-form">
          <img
            className="login-formImg"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <label className="login-labels" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="input"
            className="login-input"
            value={username}
            onChange={this.changeUsername}
            placeholder="Username"
          />
          <label className="login-labels" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={this.changePassword}
            placeholder="Password"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg !== '' && (
            <p className="login-error">
              *{errorMsg[0].toUpperCase()}
              {errorMsg.slice(1)}
            </p>
          )}
        </form>
      </div>
    )
  }
}

export default Login
