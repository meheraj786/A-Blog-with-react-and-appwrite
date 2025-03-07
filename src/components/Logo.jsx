import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='dark:bg-white w-[250px]'>
      <img src="/MID-removebg-preview.png" alt="Logo" style={{ width }} />
    </div>
  )
}

export default Logo