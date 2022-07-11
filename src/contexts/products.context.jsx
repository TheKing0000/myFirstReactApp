import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js"
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js"
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


  //!FILL UP DATABASE WITH DATA
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA)
  // }, [])

  //!need to pass value to children
  const value = {
    currentProducts,
    setCurrentProducts
  }


  return <ProductsContext.Provider value={value}>
    {children}
  </ProductsContext.Provider>
}