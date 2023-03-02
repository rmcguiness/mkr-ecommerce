import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

import { useStateContext } from '../context/StateContext'

const NavLinks = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
    </div>
  )
}

export default NavLinks