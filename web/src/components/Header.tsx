import React from 'react'

const Header = (props: any) => {
  return (
    <header className='border-b border-gray-800'>
      <h1 className='text-2xl font-bold leading-5'>{props.title}</h1>
      <p className='text-gray-400 leading-10'>{props.description}</p>
    </header>
  )
}

export default Header