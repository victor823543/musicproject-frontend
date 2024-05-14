import { useState } from 'react'
import { ProgressCircle, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import FullProgress from './FullProgress'
import SessionPage from './components/SessionPage'
import FinishModal from './components/FinishModal'
import useInterval from '../../hooks/useInterval'

const IntervalProgress = (props) => {
    const [showAll, setShowAll] = useState(false)
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
        refMidi,
      } = useInterval(true)

    const defaultColor = 'bg-slate-200/40 dark:bg-slate-500/20'
    const clickedColor = 'bg-blue-500/30 dark:bg-sky-400/30'



  return (

    <SessionPage
        session={intervalSession}
        refMidi={refMidi}
    >
        {showStart &&
            <div className='fixed inset-0 cover bg-slate-700/40 flex flex-col justify-center items-center dark:text-sky-200/80'>
                <div className='bg-zinc-200 dark:bg-slate-950 p-20 flex flex-col gap-10 items-center rounded-xl shadow-xl overflow-y-scroll hideScrollbar'>
                    <h1 className='font-montserrat text-3xl text-center'>Progress mode</h1>
                    <div className='flex gap-10'>
                        <div className='relative flex flex-col items-center gap-3'>
                            <h2 className='font-montserrat text-xl text-center'>Total progress</h2>
                            <ProgressCircle value={intervalSession?.totalProgress} size="lg" showAnimation>
                                <span className="text-sm font-medium font-montserrat text-slate-700">{`${intervalSession?.totalProgress}%`}</span>
                            </ProgressCircle>
                        </div>
                        <div className='relative flex flex-col items-center gap-3'>
                            <h2 className='font-montserrat text-xl text-center'>Session progress</h2>
                            <ProgressCircle value={intervalSession?.sessionBest} size="lg" showAnimation>
                                <span className="text-sm font-medium font-montserrat text-slate-700">{`${intervalSession?.sessionBest}%`}</span>
                            </ProgressCircle>
                        </div>
                    </div>
                    <h2 className='font-montserrat text-2xl text-center mt-5'>{`Current session - ${intervalSession?.level}`}</h2>
                    <button onClick={() => setShowAll(true)} className='py-2 px-4 bg-blue-600/30 ring-2 ring-blue-800 dark:ring-sky-400 rounded-sm font-montserrat'>Show all sessions</button>
                    <div className='flex gap-10'>
                        <div className='flex flex-col items-center'>
                            <h3>Session information</h3>
                            <TabGroup>
                                <TabList variant='line'>
                                    <Tab className=' text-gray-500' value={1}>Intervals</Tab>
                                    <Tab className=' text-gray-500' value={2}>Directions</Tab>
                                    <Tab className=' text-gray-500' value={3}>Octaves</Tab>
                                    <Tab className=' text-gray-500' value={4}>Length</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{intervalNames.map((name) => `${name}, `)}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{intervalSession?.directions.map((direction) => `${direction}, `)}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{intervalSession?.width}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{intervalSession?.length}</p>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>

                    </div>
                    <button onClick={handleStartClick} className='py-2 px-4 bg-blue-600/30 ring-2 ring-blue-800 dark:ring-sky-400 rounded-sm font-montserrat'>Start current session</button>
                </div>
            </div>
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
                    <button onClick={handleContinueClick} className='py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg mb-4 max-xs:mb-2'>{progress ? 'Continue' : 'Start'}</button>
                    <button onClick={handleAgainClick} className={`py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg ${!progress && 'hidden'}`}>Listen again</button>
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
                progressMode
                moveOn={stats.sessionStats['moveOn']}
            >
                <p>{`Your score: ${stats['sessionStats']['correct']}/${stats['sessionStats']['total']}`}</p>
                <h1 className='text-3xl font-montserrat text-center'>Your session stats</h1>
                <div className='flex'>
                    <div className='grid grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-x-16 gap-y-4 px-6 '>
                        {Object.entries(stats['intervalStats']).map(([interval, obj]) => 
                            <p key={interval}>{`${interval}: ${obj['correct']}/${obj['total']}`}</p>
                        )}
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <h2 className='font-montserrat text-xl'>Session progress</h2>
                        <ProgressCircle value={stats['sessionStats']['percent']} size="lg">
                            <span className="text-sm font-medium font-montserrat text-slate-700">{`${stats['sessionStats']['percent']}%`}</span>
                        </ProgressCircle>
                    </div>
                </div>
            </FinishModal>
        }

        {showAll &&
            <FullProgress type='interval' levelStats={intervalSession?.progressInfo.levelStats} current={intervalSession?.level} close={() => setShowAll(false)}/>
        }
        
    </SessionPage>
  )
}

export default IntervalProgress