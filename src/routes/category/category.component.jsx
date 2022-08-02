import React, { Fragment } from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import "./category.styles.scss"
const Category = () => {
  const [products, setProducts] = useState([])
  const { categoryNavlinkParam } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)

  useEffect(() => {
    setProducts(categoriesMap[categoryNavlinkParam])
  }
    , [categoriesMap, categoryNavlinkParam]
  )

  return (
    <Fragment>
      <h2 className='category-title'>{categoryNavlinkParam.toUpperCase()}</h2>
      <div className='category-container'>

        {
          products &&
          (
            products.map((product) => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
          )
        }
      </div>
    </Fragment>

  )
}

export default Category