import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-5'>
      <div className='absolute left-0 right-2 -top-14'>
        <img
          alt={author.name}
          height='100px'
          width="100px"
          className='align-middle rounded-full'
          src={author.photo.url}
        />
      </div>

      <h3 className='text-black my-4 text-xl font-bold'>{author.name}</h3>
      <p className='text-brown '>{author.bio}</p>
      <h3 className='text-black my-4 text-xl font-bold'>-- *** --</h3>

    </div>
  )
}

export default Author