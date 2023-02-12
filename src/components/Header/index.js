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
        <img
          className="navbar-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
        <div className="navbar-icons">
          <Link to="/">
            <AiFillHome className="navbar-icon" />
          </Link>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="navbar-icon" />
          </Link>
          <button type="button" onClick={logout} className="logout-button">
            <FiLogOut className="navbar-icon" />
          </button>
        </div>
      </nav>

      <nav className="navbar-lg">
        <img
          className="navbar-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
        <div className="navbar-tags">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/jobs" className="navbar-link">
            Jobs
          </Link>
        </div>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </nav>
    </>
  )
}

export default Header
