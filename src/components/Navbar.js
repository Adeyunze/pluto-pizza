import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { BsBasket3 } from 'react-icons/bs'
import { usePizzaContext } from '../context'


const Navbar = () => {
  const { cart } = usePizzaContext()
  return (
    <nav className='bg-[#1B557E] flex justify-between items-center px-5 py-2'>
      <Link to='/'>
        <img src={logo} alt="Pluto's pizza" />
      </Link>
      <Link to='/cart' className='relative'>
        <p className='absolute text-white top-[11px] left-[10px] text-sm'>{cart.length}</p>
        <BsBasket3 className='text-white text-3xl'/>
      </Link>
    </nav>
  )
}

export default Navbar