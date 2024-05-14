import IntervalsSettings from './IntervalsSettings'
import SessionPage from './components/SessionPage'
import FinishModal from './components/FinishModal'
import useInterval from '../../hooks/useInterval'


const Intervals = () => {
    const {
        showStart,
        showMain,
        isFinished,
        intervalSession,
        intervalNames,
        passedInterval,
        result,
        stats,
        guess,
        progress,
        handleStartClick,
        handleAgainClick,
        handleContinueClick,
        handleGuessClick,
        handleRestartClick,
        handleExtendClick,
        refMidi
    } = useInterval()


    const defaultColor = 'bg-slate-200/40 dark:bg-slate-500/20'
    const clickedColor = 'bg-blue-500/30 dark:bg-sky-400/30'

    

  return (

    <SessionPage
        session={intervalSession}
        refMidi={refMidi}
    >

        {showStart &&
            <IntervalsSettings handleStartClick={handleStartClick} />
        }

        {showMain && 
            <div className=' min-h-full pt-20'>
                <div>
                    <div className='flex gap-1'>
                        {Object.entries(result).map(([num, status]) => 
                            <div key={num} className={`h-6 flex-grow ${(status === 1) ? 'bg-green-500' : (status === 2) ? 'bg-red-500' : 'bg-slate-900/30 dark:bg-cyan-400/30'}`}></div>
                        )}
                    </div>
                </div>
                <div className='mt-14 max-xs:mt-6 max-sm:mt-10 flex flex-col items-center'>
                    <h1 className='h1-et'>Listen to the interval</h1>
                    <button onClick={handleContinueClick} className='py-2 px-4 text-lg max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg mb-4 max-xs:mb-2'>{progress ? 'Continue' : 'Start'}</button>
                    <button onClick={handleAgainClick} className={`py-2 px-4 text-lg max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg ${!progress && 'hidden'}`}>Listen again</button>
                </div>
                <div className='mt-10 max-xs:mt-2 flex flex-col items-center px-20 max-sm:px-6 '>
                    <div className='max-w-[700px]'>
                        <h1 className='h1-et'>Take a guess</h1>
                        <div className='flex flex-wrap justify-evenly gap-4'>
                            {intervalNames.map((interval) => 
                                <div onClick={() => handleGuessClick(interval)} key={interval} className={`${(guess === interval) ? clickedColor : defaultColor} flex-1 guess-btn`}>{interval}</div>
                            )}
                        </div>
                    </div>
                    
                </div>
                
                <h1 className={`pointer-events-none max-sm:absolute max-sm:text-3xl max-xs:text-xl max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 py-4 px-6 shadow-xl bg-slate-200/70 dark:bg-slate-900/60 mt-16 opacity-0 transition-opacity duration-1000 ease-in-out text-5xl text-center font-montserrat font-bold ${passedInterval['correct'] ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-500'} ${passedInterval['visible'] ? 'opacity-100' : 'opacity-0'}`}>{passedInterval['name']}</h1>
                
            </div>
        }
        {isFinished &&
            <FinishModal
                handleRestartClick={handleRestartClick}
                handleExtendClick={handleExtendClick}
            >
                <p>{`Your score: ${stats['sessionStats']['correct']}/${stats['sessionStats']['total']}`}</p>
                <h1 className='text-3xl font-montserrat text-center'>Your session stats</h1>
                <div className='grid grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-x-16 gap-y-4 px-6 '>
                    {Object.entries(stats['intervalStats']).map(([interval, obj]) => 
                        <p key={interval}>{`${interval}: ${obj['correct']}/${obj['total']}`}</p>
                    )}
                </div>
            </FinishModal>
        }
        
    </SessionPage>
  )
}

export default Intervals