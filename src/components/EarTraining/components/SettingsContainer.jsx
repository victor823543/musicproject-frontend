import React from 'react'

const SettingsContainer = ({children, title, type='grid'}) => {
    if (type === 'grid') {
  return (
    <div className={`px-10 max-xs:px-4`}>
        <h1 className='text-center text-4xl max-sm:text-3xl font-montserrat mb-3'>{title}</h1>
        <div className='flex justify-center gap-4 flex-wrap'>
            {children}
        </div>
    </div>
  )} else return (
    <div className='flex flex-col items-center mt-8 max-xs:mt-4 max-w-[1100px] px-10 max-xs:px-4'>
        <h1 className='text-center text-4xl max-sm:text-3xl font-montserrat mb-3'>{title}</h1>
        <div className='flex justify-center gap-4 flex-wrap max-xs:grid max-xs:grid-cols-2'>
            {children}
        </div>
    </div>
  )
}

export default SettingsContainer