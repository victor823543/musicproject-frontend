import React from 'react'

const FinishModal = ({children, handleRestartClick, handleExtendClick=null, progressMode=false, moveOn=null}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-10 pt-20 pb-4'>
        <div className='bg-zinc-200 dark:bg-slate-700 max-h-full xsPlus:px-8 py-8 rounded-lg shadow-xl overflow-scroll hideScrollbar'>
            <div className='flex flex-col items-center gap-4 dark:text-sky-200'>
                <h1 className='text-3xl font-montserrat text-center mb-5'>Good job</h1>

                {children}
                
                {progressMode ?
                  <button onClick={handleRestartClick} className='bg-blue-300 border-2 border-blue-500 px-4 py-2 max-xs:px-2 max-xs:py-1 rounded-md text-black font-light'>{moveOn ? 'Next session' : 'Try again'}</button>
                    :
                  <div className='grid grid-cols-2 gap-2 px-2'>
                      <button onClick={() => handleRestartClick(false)} className='bg-blue-300 border-2 border-blue-500 px-4 py-2 max-xs:px-2 max-xs:py-1 rounded-md text-black font-light'>Restart session</button>
                      <button onClick={() => handleRestartClick(true)} className='bg-blue-300 border-2 border-blue-500 px-4 py-2 max-xs:px-2 max-xs:py-1 rounded-md text-black font-light'>Restart with new settings</button>
                      <button onClick={() => handleExtendClick(false)} className='bg-blue-300 border-2 border-blue-500 px-4 py-2 max-xs:px-2 max-xs:py-1 rounded-md text-black font-light'>Extend session</button>
                      <button onClick={() => handleExtendClick(true)} className='bg-blue-300 border-2 border-blue-500 px-4 py-2 max-xs:px-2 max-xs:py-1 rounded-md text-black font-light'>Extend with new settings</button>
                  </div>
                }
            </div>
        </div>
        
    </div>
  )
}

export default FinishModal