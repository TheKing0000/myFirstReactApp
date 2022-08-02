import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js"
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js"
//actual value to access
export const CategoriesContext = createContext(
  {
    categoriesMap: {},
    setCategoriesMap: () => null
  }
)


export const CategoriesProvider = ({ children }) => {
  //GIVE IT A DEFAULT VALUE
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()

      setCategoriesMap(categoryMap)
    }
    getCategoriesMap();
  }, [])

  //!FILL UP DATABASE WITH DATA
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA)
  // }, [])

  //!need to pass value to children
  const value = {
    categoriesMap,
    setCategoriesMap
  }


  return <CategoriesContext.Provider value={value}>
    {children}
  </CategoriesContext.Provider>
}