import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react";
//we dont need a div , but we need a parent element

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import "./navigation.styles.scss"
//you can import (the svg) it as a component
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          <Link className="nav-link" to="/sign-in">SIGN IN</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation;