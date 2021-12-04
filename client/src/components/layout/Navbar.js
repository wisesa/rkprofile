import React, {Fragment, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {logout, register} from '../../actions/auth';

const Navbar=({ auth: { isAuthenticated, loading }, logout })=>{
  const authLinks=(
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-5">
        <Link to='/menus'>
          <i className="white fas fa-utensil-spoon"></i>{''}
          <span className="white hide-sm">&nbsp;&nbsp;Menu</span>
        </Link>
      </li>
      <li className="nav-item mr-5">
        <Link to='/transactions'>
          <i className="white fas fa-list"></i>{''}
          <span className="white hide-sm">&nbsp;&nbsp;Transactions</span>
        </Link>
      </li>
      <li className="nav-item mr-3">
        <a onClick={logout} href='/'>
          <i className="white fas fa-sign-out-alt"></i>{''}
          <span className="white hide-sm">&nbsp;&nbsp;Logout</span>
        </a>
      </li>
    </ul>
  );
  
  let guestLinks=null;
  const pathname = window.location.pathname;

  if(pathname!='/projects'){
    guestLinks=(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-3">
          <a className="nav-link js-scroll-trigger" href="#hero">
            <span className="purple bold hide-sm">&nbsp;&nbsp;Home</span>
          </a>
        </li>
        <li className="nav-item mr-3">
          <a className="nav-link js-scroll-trigger" href="#about">
            <span className="purple bold hide-sm">&nbsp;&nbsp;About Me</span>
          </a>
        </li>
        <li className="nav-item mr-3">
          <a className="nav-link js-scroll-trigger" href="#photos">
            <span className="purple bold hide-sm">&nbsp;&nbsp;Photos</span>
          </a>
        </li>
      </ul>
    );
  }

  const navbar=(
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">Archipelago's</Link>
        </h1>
        <ul>
          {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
        </ul>
      </nav>
  );

  const [navbarMobile, showNavbarMobile] = useState("none");

  const [scroll, setScroll] = useState("");

  useEffect(() => {
      document.addEventListener("scroll", () => {

          if(window.scrollY > 10){
              setScroll("navbar-black");
          }else{
            setScroll("");
          }
      })
  })

  return(
    <header id="header" className="fixed-top">
                <nav className={scroll+" navbar navbar-expand-lg navbar-dark fixed-top"} id="mainNav">
                    <div className="container">
                        <a className="navbar-brand js-scroll-trigger" href="/">
                            <img src="/img/logo.png" className="logo" alt="" />
                        </a>
                        <button className="btn-hamburger navbar-toggler navbar-toggler-right text-uppercase font-weight-bold text-white rounded" type="button" 
                          onClick={() => {
                            {navbarMobile=='none' ? showNavbarMobile("block") : showNavbarMobile("none")};
                          }}>
                            <i className="fas fa-bars"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>

                    <div className="navbar-mobile" style={{display:navbarMobile}}>
                      {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </header>
  );
};

Navbar.propTypes={
    logout:propTypes.func.isRequired,
    auth:propTypes.object.isRequired
};

const mapStateToProps=state=>({
    auth:state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);