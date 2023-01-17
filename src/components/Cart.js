import React from 'react';
import { usePizzaContext } from '../context';
import Cartlist from './Cartlist';


const Cart = () => {
  const { cart } = usePizzaContext()
  if(cart.length){
    return <Cartlist/>
  }

  return (
    <h1 className='text-2xl flex justify-center items-center h-[80vh]'>No Pizza to display</h1>
  )

}

export default Cart