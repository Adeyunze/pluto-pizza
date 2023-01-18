import React from 'react';
import { Link } from 'react-router-dom';
import { pizza } from '../pizza';

const PizzaPage = () => {
  return (
    <section className='my-10'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap px-7 justify-center items-center sm:justify-start sm:items-start'>
        {/* maps through every element in object and display on page */}
          {pizza.map(piz => {
            // Destructuring
            const {id, name,Image } = piz;
            return (
              <div key={id} className="bg-white shadow-md rounded-lg max-w-xs mt-4 mr-0 sm:mr-5">
                <Link to={`/pizza/${id}`}>
                  <img src={Image} alt={name} className="rounded-t-lg"/>
                </Link>
                <div className='pb-5 pl-5'>
                  <p className='pt-5 text-xl capitalize'>{name}</p>
                  <Link to={`/pizza/${id}`}>
                    <p className='pt-5 text-xs uppercase text-[#1B557E]'>Customise</p>
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default PizzaPage