import React from 'react'
import {Product,FooterBaner,HeroBaner} from '../components/index'
import {client} from '../lib/client'





const Home = ({products,bannerData,footerData,manuItems}) => {
  // console.log('products',products)
  // console.log('bannerData',bannerData)
  // console.log('footerData',footerData)
  console.log('manuItems',manuItems)
  return (
    <>
      <HeroBaner heroBanner={bannerData.length && bannerData[0] } />
      <div className="products-heading">
        <h2>Лучшие продукты</h2>
        <p>большой выбор кроссовок</p>
      </div>
      <div className="products-container">
      { products.map((item)=> <Product key={item._id}  item={item} />)}
      </div>
      <FooterBaner footerData={footerData.length && footerData[0] } />
    </>
  )
}

export default Home


export const getServerSideProps = async ()=>{
  const query = '*[_type=="product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type=="banner"]'
  const bannerData = await client.fetch(bannerQuery)

  const footerQuery = '*[_type=="footer"]'
  const footerData = await client.fetch(footerQuery)

  const menuQuery = '*[_type=="menu"]'
  const manuItems = await client.fetch(menuQuery)

  return {
    props: {products,bannerData,footerData,manuItems}
  }
}