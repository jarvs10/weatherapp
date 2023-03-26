import React from 'react'

const TopButtons = () => {

  const cities = [
    {
      id: 1,
      title: 'Medellin'
    },
    {
      id: 2,
      title: 'Bogota'
    },
    {
      id: 3,
      title: 'Buenos Aires'
    },
    {
      id: 4,
      title: 'London'
    },
    {
      id: 5,
      title: 'New York'
    },
  ]

  return (
    <div className='flex justify-between text-white mb-8 px-8'>
      {
        cities.map(city => {
          const { title, id } = city;
          return(
            <div key={id}>
              <button className='font-bold uppercase hover:text-black'>{title}</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default TopButtons