import { createContext, useState, useEffect } from "react";



const removeAllItemsOfOneType = (cartItems, productToRemove) => {
  return (
    cartItems.filter((item) => {
      return (
        item.id !== productToRemove.id
      )
    })
  )
}

const removeCartItem = (cartItems, productToRemove) => {

  const existingCartItem = cartItems.find((item) => {
    return item.id === productToRemove.id
  })

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => {
      return productToRemove.id !== item.id
    })

  } else {
    return cartItems.map((item) => {
      if (item.id === productToRemove.id) {

        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })
  }
}
const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find((item) => {
    return item.id === productToAdd.id
  })
  if (existingCartItem) {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {

        return { ...item, quantity: item.quantity + 1 }

      } else {
        return item
      }
    })
  }
  //new product
  return [...cartItems, { ...productToAdd, quantity: 1 }]

}

//actual value to access
export const CartContext = createContext(
  {
    bIsCartOpen: false,
    setbIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    setCarCount: () => { },
    removeItemFromCart: () => { },
    removeAllOfOneTypeFromCart: () => { },
    cartPriceSum: 0,
    setCartPriceSum: () => { }
  }
)


export const CartProvider = ({ children }) => {

  //GIVE IT A DEFAULT VALUE
  const [bIsCartOpen, setbIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCarCount] = useState(0)
  const [cartPriceSum, setCartPriceSum] = useState(0)

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }
  //DOnt call setCartItems directly
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeAllOfOneTypeFromCart = (productToRemove) => {
    setCartItems(removeAllItemsOfOneType(cartItems, productToRemove))
  }

  useEffect(() => {
    //!Hány darab item van a kosárban
    const newCarCount = cartItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity
    }, 0)
    setCarCount(newCarCount)
  }, [cartItems])

  useEffect(() => {
    //!kosár $ összege
    const priceSum = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity
    }, 0);
    setCartPriceSum(priceSum)

  }, [cartItems])


  //!need to pass value to children
  const value = {
    bIsCartOpen,
    setbIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    removeAllOfOneTypeFromCart,
    cartPriceSum
  }


  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}