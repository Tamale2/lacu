import React from 'react'
import {Link  } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navbar-main">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <a  className="navbar-brand" href="index.html">
          <img style={{width: '50px'}} src="images/logo3.png" alt="" />
          
        </a>
      </div>

      <div id="navbar" className="navbar-collapse collapse pull-right">
        <ul className="nav navbar-nav">
          <li>
           
            <Link to={'/'} className="is-active" >HOME</Link>
          </li>
          <li>
           
            <Link to={'/About'} className="is-active" >ABOUT</Link>
          </li>
          <Link></Link>
          <li className="has-child">
            
            <Link to={'/Causes'} className="is-active" >CAUSES</Link>

            {/* <ul className="submenu">
              <li className="submenu-item">
                <a href="causes.html">Causes list </a>
              </li>
              <li className="submenu-item">
                <a href="causes-single.html">Single cause </a>
              </li>
              <li className="submenu-item">
                <a href="causes-single.html">Single cause </a>
              </li>
              <li className="submenu-item">
                <a href="causes-single.html">Single cause </a>
              </li>
            </ul> */}
          </li>
          <li>
           
            <Link to={'/Gallery'} className="is-active" >GALLERY</Link>
            
          </li>
          <li>
          <Link to={'/Contact'} className="is-active" >CONTACT</Link>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}


// to the main control machinary of the people that are suupposed to be handling the main cargo of the leading control policy of the 