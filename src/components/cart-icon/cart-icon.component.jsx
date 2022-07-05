import React from 'react'
import "./cart-icon.styles.scss"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {

  const { bIsCartOpen, setbIsCartOpen } = useContext(CartContext)
  const { cartCount } = useContext(CartContext)






  const toogleIsCartOpen = () => {
    setbIsCartOpen(!bIsCartOpen)
  }
  return (
    <div onClick={toogleIsCartOpen} className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon