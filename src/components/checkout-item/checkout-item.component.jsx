import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckOutItem = ({ cartItem }) => {
  const { name, quantity, price } = cartItem
  const { addItemToCart, removeItemFromCart, removeAllOfOneTypeFromCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(cartItem)

  const removeProductFromCart = () => removeItemFromCart(cartItem)

  const removeOneType = () => removeAllOfOneTypeFromCart(cartItem)
  return (
    <div>
      <h2>{name}</h2>
      <h3>{quantity}</h3>
      <h3>$$${price}</h3>
      <button onClick={addProductToCart} >+</button>
      <button onClick={removeProductFromCart}>-</button>
      <button onClick={removeOneType}>Remove Item from the list</button>
    </div>
  )
}

export default CheckOutItem