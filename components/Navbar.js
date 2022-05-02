import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import {client} from '../lib/client'
import MenuItem from './MenuItem'
import Cart from './Cart'
import {useStateContext} from '../context/stateContent'
const Navbar = () => {

  const {setShowCart,showCart,totalQuantities} = useStateContext()
  const menu =[
    {
      title:'Contacts',
      link:'/contacts'
    },
    {
      title:'Home',
      link:'/'
    },
    {
      title:'Cart',
      link:'/cart'
    }
  ]
  return (
    <div className="navbar-container">
    <p className="logo">
      <Link href="/">Next.js || Sanity(admin)</Link>
    </p>
    <div className="menu">
        <ul>
        {
          menu.map((item,i)=><MenuItem key={i} item={item} />)
        }
        </ul>
    </div>

    <button type="button" className="cart-icon" onClick={()=>setShowCart(true)}>
      <AiOutlineShopping />
      <span className="cart-item-qty">{totalQuantities}</span>
    </button>

     {showCart && <Cart />}
  </div>
  )
}

export default Navbar


export const getServerSideProps = async ()=>{
    const query = '*[_type=="menu"]'
    const menuItems = await client.fetch(query)
    return {
      props: {menuItems}
    }
  }