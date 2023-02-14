import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar-sm">
        <Link to="/">
          <img
            className="navbar-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <ul className="navbar-icons">
          <li className="navbar-icons-li">
            <Link to="/">
              <AiFillHome className="navbar-icon" />
            </Link>
          </li>
          <li className="navbar-icons-li">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="navbar-icon" />
            </Link>
          </li>
          <li className="navbar-icons-li">
            <button type="button" onClick={logout} className="logout-button">
              <FiLogOut className="navbar-icon" />
            </button>
          </li>
        </ul>
      </nav>

      <nav className="navbar-lg">
        <img
          className="navbar-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
        <ul className="navbar-tags">
          <li className="navbar-icons-li">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-icons-li">
            <Link to="/jobs" className="navbar-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
