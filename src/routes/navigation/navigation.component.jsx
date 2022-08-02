import { Outlet } from "react-router-dom"
import { Fragment, useContext } from "react";
//we dont need a div , but we need a parent element
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";


import {
  NavigationContainerCSS,
  LogoContainerCSS,
  NavLinksContainerCSS,
  NavLinkCSS
} from "./navigation.styles.jsx"


//you can import (the svg) it as a component
const Navigation = () => {
  //!CONTEXT
  const { currentUser } = useContext(UserContext)
  const { bIsCartOpen } = useContext(CartContext)


  return (
    <Fragment>

      <NavigationContainerCSS>

        <LogoContainerCSS to="/">
          <CrwnLogo className="logo" />
        </LogoContainerCSS>

        <NavLinksContainerCSS>
          <NavLinkCSS to="/shop">
            SHOP
          </NavLinkCSS>
          {
            currentUser ?
              (
                <NavLinkCSS as="span" onClick={signOutUser}>
                  SIGN OUT
                </NavLinkCSS>
              ) : (
                <NavLinkCSS to="/authentication">
                  SIGN IN
                </NavLinkCSS>
              )
          }
          <CartIcon />

        </NavLinksContainerCSS>
        {
          bIsCartOpen &&
          (
            <CartDropdown />
          )
        }

      </NavigationContainerCSS>
      <Outlet />
    </Fragment>
  )
}
export default Navigation;