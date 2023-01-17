/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pizza, toppings } from '../pizza';
import { usePizzaContext } from '../context';

const SinglePizza = () => {
  const [singleProduct, setSingleProduct] = useState([])
  const [toppins, setToppins] = useState([])
  const [size, setSize] = useState('small')
  const [prize, setPrize] = useState(0)
  const [result, setResult] = useState(0)
  const {addToCart} = usePizzaContext()
  const { id } = useParams();

  const addToppins = (e) => {
    let toppinsName = e.currentTarget.innerHTML
    if(!toppins.includes(toppinsName)){
      setToppins([...toppins, toppinsName])
    }
    const small = toppins.slice(0, 3)
    const medium = toppins.slice(0, 4)
    if(toppins.length >= 3 && size === 'small'){
      setToppins(small)
    }else if(toppins.length >= 4 && size === 'medium'){
      setToppins(medium)
    }
  }



  useEffect(() => {
    const newProduct = pizza.find(single => single.id === parseInt(id))
    setSingleProduct(newProduct)
    if(size === "small"){
      setPrize(7.99)
    }else if(size === "medium"){
      setPrize(9.99)
    }else if(size === "large" ){
      setPrize(13.99)
    }
    let tempresult = (toppins.length * 1.15) + prize
    setResult((Math.round(tempresult * 100) / 100).toFixed(2))
  }, [id, prize, size, toppins, result])



  const { name, Image } = singleProduct
  return (
    <article key={id} className="flex m-10">
      <div>
        <img src={Image} alt={name} className='max-w-3xl rounded'/>
      </div>
      <div className='pl-7'>
        <h1 className='text-2xl'>{name}</h1>

        <div className='w-[300px] pt-3'>
          <label htmlFor="pizzaSizes" className="block mb-2 text-sm font-medium text-gray-900">Select Size</label>
          <select id="pizzaSizes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" onChange={(e) => setSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className='mt-4'>
            <h1>Toppins (£1.15 for each)</h1>
          <div className='flex flex-col w-[300px] bg-white mt-3 p-5'>
            {toppings.map(topps => {
              const {id, name} = topps
              return(
                <div key={id} className="mt-3">
                  <div className='flex items-center'>
                  <button className='capitalize ml-3 hover:text-[#1B557E]' onClick={(e) => addToppins(e)}>{name}</button>
                  </div>
                </div> 
              )
            })}
          </div>
          {toppins.length ? 
          <p className='text-md pt-5 capitalize'>
            Toppins: ({toppins.join(', ')})
          </p> : ""
          }
          <p className='mt-10'><span className='text-xl'>Total:</span> £{result}</p>
          <Link to='/cart'>
            <button className='px-7 py-3 bg-[#1B557E] text-white mt-5 rounded' onClick={() => addToCart(Date.now(), size, singleProduct, toppins, result)}>Add to basket</button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default SinglePizza