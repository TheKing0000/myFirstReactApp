import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CheckOutItem from '../../components/checkout-item/checkout-item.component'
const CheckOut = () => {
  const { cartItems, cartPriceSum } = useContext(CartContext)

  return (
    <div>
      {
        cartItems.map((cartItem) => {
          return (
            <CheckOutItem key={cartItem.id} cartItem={cartItem} />
          )
        })
      }
      <h2>SUM OF $$$$</h2>
      <h3>{cartPriceSum}</h3>
    </div>
  )
}

export default CheckOut