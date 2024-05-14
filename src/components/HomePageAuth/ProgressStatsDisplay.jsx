import { ProgressCircle } from "@tremor/react"

const ProgressStatsDisplay = ({type, setShowFullProgress, totalProgress, sessionProgress, currentLevel, levelInfoA, levelInfoB, currentSessionInfo, verticalShrink=false}) => {
  return (
    <div className='bg-slate-700/30 py-4 px-12 max-sm:px-4 max-xs:px-2 rounded-lg shadow-lg w-fit mx-auto my-5'>
        <div className='flex flex-col gap-10 justify-center max-md:items-center mt-4 mb-20'>
            <div className='flex max-md:flex-col gap-16 justify-center max-md:items-center'>
                <div className='flex flex-col items-center gap-3'>
                    <h2 className='font-montserrat text-xl'>Total progress</h2>
                    <ProgressCircle className='relative' value={totalProgress} size="xl" strokeWidth={16} showAnimation>
                        <span className="text-sm font-medium font-montserrat text-slate-700 dark:text-sky-100">{`${totalProgress}%`}</span>
                    </ProgressCircle>
                </div>
                <div className={`relative flex ${verticalShrink ? 'xsPlus:max-sm:flex-col' : 'max-sm:flex-col'}  max-sm:items-center gap-5 max-sm:gap-10 bg-slate-600/30 rounded-xl sm:p-6 py-6 px-6 my-auto`}>
                    <div className={`flex ${verticalShrink && 'max-xsPlus:flex-col'} gap-5`}>
                        {Array.from({ length: 3 }, (_, index) => parseInt(Math.max(1, currentLevel - 1)) + index).map((level, index) => {

                            return (
                                <div key={level} className={`bg-sky-500/60 hover:bg-sky-800/40 px-4 py-2 rounded-lg text-black font-montserrat text-center ${(level == currentLevel && 'scale-125 mx-2')}`}>
                                    <p>{`Level ${level}`}</p>
                                    <p className='text-xs'>{levelInfoA(level)}</p>
                                    <p className='text-xs'>{levelInfoB(level)}</p>
                                    <p className='text-xs'>...</p>
                                </div>
                            )
                        })}
                    </div>
                    
                    <button onClick={() => setShowFullProgress(type)} className='text-sm w-16 py-1 px-2 text-center text-black font-light bg-emerald-500/80 m-auto rounded-md'>Show all</button>
                    
                </div>
            </div>
            <div className='flex max-sm:flex-col gap-16 max-sm:gap-10 justify-center items-center'>
                <div className='flex flex-col items-center gap-3'>
                    <h2 className='font-montserrat text-xl text-center'>Session progress</h2>
                    <ProgressCircle className='relative' value={sessionProgress} size="xl" strokeWidth={16} showAnimation>
                        <span className="text-sm font-medium font-montserrat text-slate-700 dark:text-sky-100">{`${sessionProgress}%`}</span>
                    </ProgressCircle>
                </div>
                <div className='flex flex-col gap-1 items-center bg-slate-600/30 rounded-xl p-6 font-montserrat max-w-96'>
                    <h2 className='text-center text-lg'>Current session information</h2>
                    {currentSessionInfo}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ProgressStatsDisplay