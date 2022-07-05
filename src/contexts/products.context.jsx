import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shopdata.json"
//actual value to access
export const ProductsContext = createContext(
  {
    currentProducts: [],
    setCurrentProducts: () => null
  }
)


export const ProductsProvider = ({ children }) => {
  //GIVE IT A DEFAULT VALUE
  const [currentProducts, setCurrentProducts] = useState([])

  //!need to pass value to children
  const value = {
    currentProducts,
    setCurrentProducts
  }
  useEffect(() => {
    setCurrentProducts(PRODUCTS)
  }, [])



  return <ProductsContext.Provider value={value}>
    {children}
  </ProductsContext.Provider>
}