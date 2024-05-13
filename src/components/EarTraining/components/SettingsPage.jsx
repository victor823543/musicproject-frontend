import React from 'react'

const SettingsPage = ({gridChildren, singleChildren, handleStartClick}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-10 pt-20 pb-4 '>
            <div className='modal-et hideScrollbar'>
                <div className='mb-6 max-xs:mb-3 px-4'>
                    <h1 className='text-center text-5xl max-sm:text-3xl max-xs:text-2xl font-montserrat mb-3'>Custom Settings</h1>
                    <h3 className='text-center text-xl max-sm:text-lg max-xs:text-sm font-montserrat font-light'>Create your own custiomizable session</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 relative'>
                    {gridChildren}
                    <div className='hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 h-5/6 border-r-2 border-sky-600/50 dark:border-blue-900'></div>
                </div>
                
                {singleChildren}

                <div className='flex justify-center mt-6'>
                    <button onClick={handleStartClick} className='py-2 px-4 font-montserrat dark:text-emerald-100 bg-green-500/30 ring-2 ring-green-600 rounded-md shadow-lg'>Start session</button>
                </div>
                

            </div> 
                
        </div>
  )
}

export default SettingsPage