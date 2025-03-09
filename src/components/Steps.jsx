import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
      <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>
      
      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((items, index) => (
          <div 
            key={index} 
            className='flex items-center gap-4 px-8 py-5 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg min-h-[100px]'
          >
            <img width={40} src={items.icon} alt="" />
            <div className='flex flex-col justify-center py-2'>
              <h2 className='text-xl font-medium'>{items.title}</h2>
              <p className='text-gray-500'>{items.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
