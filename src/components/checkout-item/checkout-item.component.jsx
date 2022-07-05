import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import "./checkout-item.styles.scss"



const CheckOutItem = ({ cartItem }) => {

  const { name, quantity, price, imageUrl } = cartItem
  const {
    addItemToCart,
    removeItemFromCart,
    removeAllOfOneTypeFromCart
  } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(cartItem)
  const removeProductFromCart = () => removeItemFromCart(cartItem)
  const removeOneType = () => removeAllOfOneTypeFromCart(cartItem)


  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>

      <span className='quantity'>
        <div className='arrow' onClick={removeProductFromCart}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addProductToCart}>
          &#10095;
        </div>
      </span>

      <span className='price'>{price}</span>

      <div className='remove-button' onClick={removeOneType}>
        &#10005;
      </div>

    </div>
  )
}

export default CheckOutItem;