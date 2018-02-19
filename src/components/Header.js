import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const Header = ({ startLogout }) => (
  <header className='header'>
    <div className='content-container'>
      <div className='header__content'>
        <Link className='header__title' to='/'>
          <h1>Animated GIF Search</h1>
          <img src='/images/giphy-logo.gif' />
        </Link>
      </div>
    </div>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(Header)
