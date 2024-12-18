import React, { useState } from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='navbar'>
            <div className="navbar__container">
                <a href="/" id="navbar__logo">Car Info</a>
                <img src="logo.png" className='logo-img' />
                <div className="navbar__toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <a href="/carPage" className="navbar__links" id="home-page" onClick={onclick}>
                            Cars
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="/about" className="navbar__links" id="about-page">
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <script src='../css/app.js'></script>
    </>
  )
}

export default Navbar